const client = require("./index");

async function addCarToHubInventory(carId, hubId) {
  // if (hubId > 4 || hubId < 1) {
  //   console.log(
  //     `******************************hub: ${hubId} does not exist******************************`
  //   );
  //   return null;
  // } else if (carId > 15 || carId < 0) {
  //   console.log(
  //     `******************************car: ${carId} does not exist******************************`
  //   );
  //   return null;
  // } else {
  try {
    await client.connect();

    const {
      rows: [inventory],
    } = await client.query(
      `
        INSERT INTO inventory("carId", "hubId")
        VALUES ($1, $2)
        ON CONFLICT("carId", "hubId") DO NOTHING
        RETURNING *;
      `,
      [carId, hubId]
    );
    await client.release();

    return inventory;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// }

async function removeCarFromHubInventory(carId, hubId) {
  try {
    await client.connect();

    const {
      rows: [car],
    } = await client.query(
      `
    DELETE FROM inventory
    WHERE "carId" = $1 AND "hubId" = $2
    RETURNING *;
    `,
      [carId, hubId]
    );
    await client.release();

    return car;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getInventoryByHubId(hubId) {
  try {
    await client.connect();

    const { rows } = await client.query(
      `
    SELECT * FROM inventory
    WHERE "hubId" = $1;
    `,
      [hubId]
    );
    await client.release();
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  addCarToHubInventory,
  removeCarFromHubInventory,
  getInventoryByHubId,
};
