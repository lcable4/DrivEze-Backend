const client = require("./index");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  password = hashedPassword;
  try {
    await client.connect();
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users (username, password, email)
            VALUES($1, $2, $3)
            RETURNING id, username, email;`,
      [username, password, email]
    );
    await client.release();
    return user;
  } catch (e) {
    throw e;
  }
}


async function getUser({username, password})
{
    try
    {
    console.log(username, password)
        await client.connect();
        const 
        {
            rows:[user]
        }
        = await client.query(`
            SELECT * FROM users
            WHERE username=$1; 
        `, [username]);
        await client.release();
        let isValid;
        if(user.password)
        {
            isValid = await bcrypt.compare(password, user.password);
        }
        if(isValid)
        {
            delete user.password;
            return user;
        }
        return null;
    }
    catch(e)
    {
        console.error(e);
    }
}
async function getUserById(userId) {
  try {
    await client.connect();
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
            FROM users
            WHERE id = $1;
            `,
      [userId]
    );
    await client.release();
    if (!user) {
      return null;
    } else {
      delete user.password;
      return user;
    }
  } catch (e) {
    throw e;
  }
}

async function getUserByEmail(email) {
  try {
    await client.connect();
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
            FROM users
            WHERE email = $1;
            `,
      [email]
    );
    await client.release();
    if (!user) {
      return null;
    } else {
      delete user.password;
      return user;
    }
  } catch (e) {
    throw e;
  }
}

async function updateUser({ userId, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    await client.connect();

    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE users
            SET ${setString}
            WHERE id=${userId}
            RETURNING *;
        `,
      Object.values(fields)
    );

    await client.release();
    return user;
  } catch (e) {
    throw e;
  }
}

async function deleteUser(userId) {
  try {
    await client.connect();

    const {
      rows: [user],
    } = await client.query(
      `
            DELETE FROM users
            WHERE id=$1
            RETURNING *;`,
      [userId]
    );
    await client.release();
    return user;
  } catch (e) {
    console.error(e);
  }
}

async function deactivateUser() {}

module.exports = 
{
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    getUser
}

