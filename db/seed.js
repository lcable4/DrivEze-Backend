const { client } = require("./index");
const bcrypt = require("bcrypt");

// const { createUser } = require("./users");
const { createCar } = require("./cars");
const { createHub } = require("./hubs");

const { createUser, createCar } = require("./");
//hello

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS inventory;
    DROP TABLE IF EXISTS car_tags;
    DROP TABLE IF EXISTS hubs;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS cars;
    DROP TABLE IF EXISTS users;`);
    console.log("Finished dropping tables!");
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
      email VARCHAR(255) UNIQUE NOT NULL,
      location VARCHAR(255),
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
        active BOOLEAN DEFAULT TRUE
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
        location VARCHAR(255) UNIQUE NOT NULL
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

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { name: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    // const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    // console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialHubs() {
  console.log("Starting to create hubs...");
  try {
    const hubsToCreate = [
      { id: 1, location: "Arizona" },
      { id: 2, location: "Nevada" },
      { id: 3, location: "Texas" },
      { id: 4, location: "Colorado" },
    ];
    const hubs = await Promise.all(hubsToCreate.map(createHub));

    console.log("Hubs created:");
    console.log(hubs);
    console.log("Finished creating hubs!");
  } catch (error) {
    console.error("Error creating hubs!");
    throw error;
  }
}

async function createInitialVehicles() {
  console.log("Starting to create vehicles...");
  try {
    const vehiclesToCreate = [
      {
        name: "Ford Focus",
        description: "high-mpg sedan",
        price: 100,
        hubLocation: "Nevada",
        category: "car",
      },
      {
        name: "Toyota Camry",
        description: "high-mpg sedan",
        price: 100,
        hubLocation: "Arizona",
        category: "car",
      },
      {
        name: "Honda Civic",
        description: "high-mpg sedan",
        price: 100,
        hubLocation: "Texas",
        category: "car",
      },
      {
        name: "Chevrolet Silverado",
        description: "powerful truck",
        price: 150,
        hubLocation: "Nevada",
        category: "truck",
      },
      {
        name: "Ford F-150",
        description: "powerful truck",
        price: 150,
        hubLocation: "Colorado",
        category: "truck",
      },
      {
        name: "Ram 1500",
        description: "powerful truck",
        price: 150,
        hubLocation: "Arizona",
        category: "truck",
      },
      {
        name: "Jeep Wrangler",
        description: "off-road SUV",
        price: 200,
        hubLocation: "Nevada",
        category: "SUV",
      },
      {
        name: "Toyota 4Runner",
        description: "off-road SUV",
        price: 200,
        hubLocation: "Colorado",
        category: "SUV",
      },
      {
        name: "Chevrolet Tahoe",
        description: "family SUV",
        price: 175,
        hubLocation: "Texas",
        category: "SUV",
      },
      {
        name: "Tesla Model S",
        description: "luxury electric sedan",
        price: 400,
        hubLocation: "Nevada",
        category: "luxury",
      },
      {
        name: "BMW 7 Series",
        description: "luxury sedan",
        price: 350,
        hubLocation: "Colorado",
        category: "luxury",
      },
      {
        name: "Mercedes-Benz S-Class",
        description: "luxury sedan",
        price: 350,
        hubLocation: "Texas",
        category: "luxury",
      },
      {
        name: "Mercedes-Benz GLS",
        description: "luxury SUV",
        price: 400,
        hubLocation: "Nevada",
        category: "luxury",
      },
      {
        name: "Range Rover",
        description: "luxury SUV",
        price: 400,
        hubLocation: "Colorado",
        category: "luxury",
      },
      {
        name: "Lamborghini Urus",
        description: "luxury SUV",
        price: 500,
        hubLocation: "Texas",
        category: "luxury",
      },
    ];
    const vehicles = await Promise.all(vehiclesToCreate.map(createCar));

    console.log("Vehicles created:");
    console.log(vehicles);
    console.log("Finished creating vehicles!");
  } catch (error) {
    console.error("Error creating vehicles!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialVehicles();
    await createInitialUsers();
    await createInitialHubs();
  } catch (error) {
    console.error(error);
  }
}

async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Finished database tests!");
  } catch (error) {
    console.log("Error testing database!");
    console.error(error);
  }
}

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
