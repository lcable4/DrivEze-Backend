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
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.log("Error when building tables!");
    throw error;
  }
}
