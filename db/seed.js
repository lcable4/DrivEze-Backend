const { client } = require("./index");

async function dropTables() {
  try {
    // console.log("Starting to drop tables...");
    // await client.query(`
    // DROP TABLE IF EXISTS
    // DROP TABLE IF EXISTS
    // DROP TABLE IF EXISTS
    // DROP TABLE IF EXISTS `
    // );
    // console.log("Finished dropping tables!");
  } catch (error) {
    console.log("Error when dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      location VARCHAR(255) NOT NULL,
      active BOOLEAN DEFAULT TRUE,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
      );

      CREATE TABLE cars(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        "hubLocation" VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE,
      );

      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE car_tags(
        id SERIAL PRIMARY KEY,
        "carId" INTEGER REFERENCES cars(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("carId","tagId")
      );

      CREATE TABLE hubs(
        id SERIAL PRIMARY KEY,
        location VARCHAR(255) UNIQUE NOT NULL,
      );

      CREATE TABLE inventory(
        id SERIAL PRIMARY KEY,
        "hubId" INTEGER REFERENCES hubs(id),
        "carId" INTEGER REFERENCES cars(id)
      );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.log("Error when building tables!");
    throw error;
  }
}
