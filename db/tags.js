const { client } = require("./index");

async function getAllTags() {
  const { rows } = await client.query(`
      SELECT * FROM tags
      `);
  return rows;
}

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const insertValues = tagList.map((_, index) => `$${index + 1}`).join("), (");

  const selectValues = tagList.map((_, index) => `$${index + 1}`).join(", ");

  try {
    await client.query(
      `
        INSERT INTO tags(name)
        VALUES (${insertValues})
        ON CONFLICT (name) DO NOTHING`,
      tagList
    );

    const { rows } = await client.query(
      `
        
        SELECT * FROM tags
        WHERE name
        IN (${selectValues});`,
      tagList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createCarTag(carId, tagId) {
  try {
    await client.query(
      `
            INSERT INTO car_tags("carId", "tagId")
            VALUES ($1, $2)
            ON CONFLICT ("carId", "tagId") DO NOTHING;
          `,
      [carId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToCar(carId, tagList) {
  try {
    const createCarTagPromises = tagList.map((tag) =>
      createCarTag(carId, tag.id)
    );
    await Promise.all(createCarTagPromises);

    return await getCarById(carId);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllTags,
  createTags,
  createCarTag,
  addTagsToCar,
};
