const client = require("./index");
//Creates a new hub
async function createHub(location) {
  try {
    await client.connect();

    const {
      rows: [hub],
    } = await client.query(
      `
            INSERT INTO hubs(location)
            VALUES ($1)
            RETURNING *;
            `,
      [location]
    );
    await client.release();

    return hub;
  } catch (e) {
    console.error(e);
  }
}
//Returns all hubs
async function getAllHubs() {
  try {
    await client.connect();

    const { rows: hubs } = await client.query(`
            SELECT * FROM hubs;
        `);

    await client.release();

    return hubs;
  } catch (e) {
    console.error(e);
  }
}
//Returns hub that matches ID passed in
async function getHubById(hubId) {
  try {
    await client.connect();

    const { rows: hub } = await client.query(
      `
            SELECT *
            FROM hubs
            WHERE id=$1;
            `,
      [hubId]
    );
    await client.release();

    return hub;
  } catch (e) {
    console.error(e);
  }
}
//Returns hub associated with given location passed in
async function getHubByLocation(location) {
  try {
    await client.connect();

    const { rows: hub } = await client.query(
      `
            SELECT *
            FROM hubs
            WHERE location=$1;
            `,
      [location]
    );
    await client.release();

    return hub;
  } catch (e) {
    console.error(e);
  }
}
//updates a hub's location that matches the ID passed in
async function updateHub(location, hubId) {
  try {
    await client.connect();

    const {
      rows: [hub],
    } = await client.query(
      `
          UPDATE hubs
          SET location = $1
          WHERE id = $2
          RETURNING *;
          `,
      [location, hubId]
    );
    await client.release();
    return hub;
  } catch (e) {
    console.error(e);
  }
}
//Deletes a hub matching the ID passed in
async function deleteHub(hubId) {
  try {
    await client.connect();
    const { rowCount } = await client.query(
      `
          DELETE FROM hubs
          WHERE id=$1;
        `,
      [hubId]
    );
    await client.release();
    return rowCount;
  } catch (e) {
    console.error(e);
  }
}

async function deactivateHub(hubId) {
  try {
    await client.connect();
    const { rowCount } = await client.query(
      `
        UPDATE hubs
        SET active = false
        WHERE id=$1;
        `,
      [hubId]
    );
    await client.release();
    return rowCount;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createHub,
  getAllHubs,
  getHubById,
  getHubByLocation,
  updateHub,
  deleteHub,
  deactivateHub,
};
