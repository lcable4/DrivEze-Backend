const { client } = require("./index");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  password = hashedPassword;
  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users (username, password, email)
             VALUES($1, $2, $3)
             ON CONFLICT(username, email) DO NOTHING
             RETURNING id, username, email;
            `,
      [username, password, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  const isValid = await bcrypt.compare(password, hashedPassword);
  try {
    if (!isValid) {
      return null;
    } else {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
            FROM users
            WHERE id = $1;
            `,
      [userId]
    );
    if (!user) {
      return null;
    } else {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
            FROM users
            WHERE username = $1;
            `,
      [username]
    );
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `SELECT *
            FROM users
            WHERE email = $1;
            `,
      [email]
    );
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
};
