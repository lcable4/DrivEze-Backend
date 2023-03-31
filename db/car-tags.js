const client = require("./index");

async function addTagToCar(tagId, carId) {
  try {
    await client.connect();

    const {
      rows: [car_tag],
    } = await client.query(
      `
            INSERT INTO car_tags("carId", "tagId")
            VALUES ($1, $2)
            ON CONFLICT("carId, "tagId") DO NOTHING;
            `,
      [carId, tagId]
    );
    await client.release();

    return car_tag;
  } catch (e) {
    console.error(e);
  }
}

async function removeTagFromCar(tagId, carId) {
  try {
    await client.connect();

    const result = await client.query(
      `
    DELETE tagId FROM car_tags
    WHERE "tagId" === $1 && "carId" === $2;
    `,
      [tagId, carId]
    );
    await client.release();

    return result;
  } catch (error) {
    throw error;
  }
}

async function getTagsByCar(carId) {
  try {
    await client.connect();

    const {
      rows: [tags],
    } = await client.query(
      `
    SELECT * FROM car_tags
    WHERE "carId" === $1;
    `,
      [carId]
    );
    await client.release();

    return tags;
  } catch (error) {
    throw error;
  }
}

async function getCarsByTag(tagId) {
  try {
    await client.connect();
    const {
      rows: [car],
    } = await client.query(
      `
    SELECT * FROM car_tags
    WHERE "tagId" === $1;
    `,
      [tagId]
    );
    await client.release();
    return car;
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    await client.connect();
    console.log("starting to test database");

    console.log("testing addTagToCar()");
    const tag = await addTagToCar();
    console.log("addTagToCar() result:", tag);

    console.log("finished testing database");
    await client.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  addTagToCar,
  removeTagFromCar,
  getTagsByCar,
  getCarsByTag,
};
