const client = require("./index");

async function addCarToHubInventory(carId, hubId) {
  try {
    await client.connect();

    const {
      rows: [inventory],
    } = await client.query(
      `
            INSERT INTO inventory("carId", "hubId")
            VALUES ($1, $2)
            ON CONFLICT("carId, "hubId") DO NOTHING;
        `,
      [carId, hubId]
    );

    await client.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function removeCarFromHubInventory(carId, hubId) {}

async function getInventoryByHubId(hubId) {}
