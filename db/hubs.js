const { client } = require("./index");

async function createHub({ id, location }) {
  try {
    console.log(`Creating new hub...`);
    const { rows } = await client.query(
      `
        INSERT INTO hubs(id, location)
        VALUES ($1, $2)
        RETURNING *;
      `,
      [id, location]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getAllHubs() {
  try {
    console.log("Getting all hubs...");
    const { rows } = await client.query(`
        SELECT *
        FROM hubs;
      `);

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getHubById(id) {
  try {
    console.log(`Getting hub with ID ${id}...`);
    const { rows } = await client.query(
      `
        SELECT *
        FROM hubs
        WHERE id=$1;
      `,
      [id]
    );

    if (rows.length) {
      return rows[0];
    }

    throw new Error(`No hub with ID ${id} found.`);
  } catch (error) {
    console.error(error);
  }
}

async function getHubByLocation(location) {
  try {
    console.log(`Getting hub with location ${location}...`);
    const { rows } = await client.query(
      `
          SELECT *
          FROM hubs
          WHERE location=$1;
        `,
      [location]
    );

    console.log(rows, "ROWS LOG!!!!!!!!!!!!!!!!!!!!!!!");
    if (rows.length) {
      return rows[0];
    }

    throw new Error(`No hub with a nearby location.`);
  } catch (error) {
    console.error(error);
  }
}
//ADD CAR TO HUB
module.exports = {
  createHub,
  getHubById,
  getAllHubs,
  getHubByLocation,
};
