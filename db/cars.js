const client = require("./index");

async function createCar({ name, description, daily_rate, hubLocation }) {
  try {
    await client.connect();

    const {
      rows: [car],
    } = await client.query(
      `
        INSERT INTO cars(name, description, daily_rate, "hubLocation")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
      [name, description, daily_rate, hubLocation]
    );
    await client.release();
    return car;
  } catch (e) {
    console.error(e);
  }
}

//creates a string and sets the values of the updated fields using Object.keys
async function updateCar({ carId, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    await client.connect();

    const {
      rows: [car],
    } = await client.query(
      `
        UPDATE cars
        SET ${setString}
        WHERE id=${carId}
        RETURNING *;
      `,
      [...Object.values(fields)]
    );

    await client.release();

    return car;
  } catch (e) {
    console.error(e);
  }
}

async function getAllCars() {
  try {
    await client.connect();
    const {
      rows: cars,
    } = await client.query(`
        SELECT *
        FROM cars;
      `);

    await client.release();

    return cars;
  } catch (e) {
    console.error(e);
  }
}

async function getCarById(carId) {
  try {
    await client.connect();
    const {
      rows: [car],
    } = await client.query(
      `
        SELECT *
        FROM cars
        WHERE id=$1;
        `,
      [carId]
    );

    await client.release();

    return car;
  } catch (e) {
    console.error(e);
  }
}
async function getCarsByHubLocation(hubLocation) {
  try {
    await client.connect();
    const {
      rows: [car],
    } = await client.query(
      `
      SELECT *
      FROM cars
      WHERE "hubLocation"=$1
      `,
      [hubLocation]
    );
    await client.release();
    console.log(car, "CAR BY HUB");
    return car;
  } catch (e) {
    console.error(e);
  }
}

//deletes a car based on the carId passed in
async function deleteCar(carId) {
  try {
    await client.connect();

    const {
      rows: [car],
    } = await client.query(
      `
         DELETE FROM cars
         WHERE id=$1
         RETURNING *;
        `,
      [carId]
    );

    await client.release();

    return car;
  } catch (e) {
    console.error(e);
  }
}

//this function will change the active tag from true to false in the cars table
async function deactivateCar(carId) {
  try {
    await client.connect();

    const {
      rows: [car],
    } = await client.query(
      `
      UPDATE cars
      SET active = false
      WHERE id=$1;
      `,
      [carId]
    );

    await client.release();
    return car;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  createCar,
  updateCar,
  getAllCars,
  getCarById,
  getCarsByHubLocation,
  deleteCar,
  // getCarsByTag,
  deactivateCar,
};
