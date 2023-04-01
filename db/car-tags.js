const client = require("./index");

async function addTagToCar(carId, tagId) {
  try {
    await client.connect();

    const {
      rows: [car_tag],
    } = await client.query(
      `
        INSERT INTO car_tags("carId", "tagId")
        VALUES ($1, $2)
        ON CONFLICT("carId", "tagId") DO NOTHING
        RETURNING *;
      `,
      [carId, tagId]
    );
    await client.release();

    return car_tag;
  } catch (e) {
    console.error(e);
    throw new Error("Error adding tag");
  }
}

async function removeTagFromCar(tagId, carId) {
  try {
    await client.connect();

    const {
      rows: [tag],
    } = await client.query(
      `
    DELETE FROM car_tags
    WHERE "tagId" = $1 AND "carId" = $2
    RETURNING *;
    `,
      [tagId, carId]
    );
    await client.release();

    return tag;
  } catch (error) {
    throw error;
  }
}

async function getTagsByCar(carId) {
  try {
    await client.connect();

    const { rows } = await client.query(
      `
    SELECT * FROM car_tags
    WHERE "carId" = $1;
    `,
      [carId]
    );
    await client.release();

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getCarsByTag(tagId) {
  try {
    await client.connect();
    const { rows } = await client.query(
      `
    SELECT * FROM car_tags
    WHERE "tagId" = $1;
    `,
      [tagId]
    );
    await client.release();
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTagToCar,
  removeTagFromCar,
  getTagsByCar,
  getCarsByTag,
};
