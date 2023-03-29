const { client } = require("./index");

async function getAllTags() {
  const { rows } = await client.query(`
      SELECT * FROM tags
      `);
  return rows;
}
async function createTags(name) {
  if (name.length === 0) {
    return;
  }
  try {
    const search = await client.query(
      `
            SELECT * FROM tags
            WHERE name =($1);`,
      [name]
    );
    if (search.rows.length > 0) {
      console.log(`Tag with name '${name}' already exists`);
      return;
    }
    const result = await client.query(
      `
          INSERT INTO tags(name)
          VALUES ($1)
          RETURNING id, name
        `,
      [name]
    );
    console.log(`Created tag with name '${name}'`);
    return result.rows[0];
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
