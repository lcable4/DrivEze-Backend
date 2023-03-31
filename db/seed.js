const client = require("./index");

const { createUser } = require("./users");
const { createCar } = require("./cars");
const {
  createHub,
  getAllHubs,
  getHubById,
  getHubByLocation,
  updateHub,
  deleteHub,
  deactivateHub,
} = require("./hubs");
const { createTag } = require("./tags");
const {
  addTagToCar,
  removeTagFromCar,
  getTagsByCar,
  getCarsByTag,
} = require("./car-tags");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.connect();
    await client.query(`
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS inventory;
      DROP TABLE IF EXISTS car_tags;
      DROP TABLE IF EXISTS hubs;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS cars;
      DROP TABLE IF EXISTS users;`);
    console.log("Finished dropping tables!");
    await client.release();
  } catch (error) {
    console.log("Error when dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    await client.connect();
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
        id SERIAL PRIMARY KEY UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        daily_rate INTEGER NOT NULL,
        "hubLocation" VARCHAR(255) NOT NULL,
        active BOOLEAN DEFAULT TRUE
      );
      
      CREATE TABLE tags(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        active BOOLEAN DEFAULT TRUE
      );
      
      CREATE TABLE car_tags(
        id SERIAL PRIMARY KEY,
        "carId" INTEGER REFERENCES cars(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE("carId", "tagId")
      );
      
      CREATE TABLE hubs(
        id SERIAL PRIMARY KEY,
        location VARCHAR(255) UNIQUE NOT NULL,
        active BOOLEAN DEFAULT TRUE
      );
      
      CREATE TABLE inventory(
        id SERIAL PRIMARY KEY,
        "hubId" INTEGER REFERENCES hubs(id),
        "carId" INTEGER REFERENCES cars(id),
        UNIQUE("carId", "hubId")
      );
      
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isOrdered" BOOLEAN DEFAULT false
      );
      
      CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES cart(id),
        "carId" INTEGER REFERENCES cars(id),
        price INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1
      );
      
      `);
    console.log("Finished building tables!");
    client.release();
  } catch (error) {
    console.log("Error when building tables!");
    throw error;
  }
}
async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99", email: "albert@gmail.com" },
      { username: "sandra", password: "sandra123", email: "sandra@gmail.com" },
      {
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal@gmail.com",
      },
    ];
    //const users = await Promise.all(usersToCreate.map(createUser));
    const users = [];
    for (let i = 0; i < usersToCreate.length; i++) {
      users.push(await createUser(usersToCreate[i]));
    }
    console.log("Users created:");
    console.log(users);
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
    //const hubs = await Promise.all(hubsToCreate.map(createHub));
    const hubs = [];

    for (let i = 0; i < hubsToCreate.length; i++) {
      hubs.push(await createHub(hubsToCreate[i]));
    }

    console.log("Hubs created:");
    console.log(hubs);
    console.log("Finished creating hubs!");
  } catch (error) {
    console.error("Error creating hubs!");
    throw error;
  }
}

async function createInitialTags() {
  console.log("Starting to create tags...");
  try {
    const tagsToCreate = [
      "Truck",
      "Sedan",
      "Coupe",
      "Van",
      "Minivan",
      "Hatchback",
      "SUV",
      "Convertible",
      "Luxury",
      "Electric",
      "Gas",
      "Hybrid",
    ];
    //const tags = await Promise.all(tagsToCreate.map(createTags));
    const tags = [];

    for (let i = 0; i < tagsToCreate.length; i++) {
      tags.push(await createTag(tagsToCreate[i]));
    }

    console.log("Tags created:");
    console.log(tags);
    console.log("Finished creating tags!");
  } catch (error) {
    console.error("Error creating tags!");
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
        daily_rate: 100,
        hubLocation: "Nevada",
      },
      {
        name: "Toyota Camry",
        description: "high-mpg sedan",
        daily_rate: 100,
        hubLocation: "Arizona",
      },
      {
        name: "Honda Civic",
        description: "high-mpg sedan",
        daily_rate: 100,
        hubLocation: "Texas",
      },
      {
        name: "Chevrolet Silverado",
        description: "powerful truck",
        daily_rate: 150,
        hubLocation: "Nevada",
      },
      {
        name: "Ford F-150",
        description: "powerful truck",
        daily_rate: 150,
        hubLocation: "Colorado",
      },
      {
        name: "Ram 1500",
        description: "powerful truck",
        daily_rate: 150,
        hubLocation: "Arizona",
      },
      {
        name: "Jeep Wrangler",
        description: "off-road SUV",
        daily_rate: 200,
        hubLocation: "Nevada",
      },
      {
        name: "Toyota 4Runner",
        description: "off-road SUV",
        daily_rate: 200,
        hubLocation: "Colorado",
      },
      {
        name: "Chevrolet Tahoe",
        description: "family SUV",
        daily_rate: 175,
        hubLocation: "Texas",
      },
      {
        name: "Tesla Model S",
        description: "luxury electric sedan",
        daily_rate: 400,
        hubLocation: "Nevada",
      },
      {
        name: "BMW 7 Series",
        description: "luxury sedan",
        daily_rate: 350,
        hubLocation: "Colorado",
      },
      {
        name: "Mercedes-Benz S-Class",
        description: "luxury sedan",
        daily_rate: 350,
        hubLocation: "Texas",
      },
      {
        name: "Mercedes-Benz GLS",
        description: "luxury SUV",
        daily_rate: 400,
        hubLocation: "Nevada",
      },
      {
        name: "Range Rover",
        description: "luxury SUV",
        daily_rate: 400,
        hubLocation: "Colorado",
      },
      {
        name: "Lamborghini Urus",
        description: "luxury SUV",
        daily_rate: 500,
        hubLocation: "Texas",
      },
    ];
    //const vehicles = await Promise.all(vehiclesToCreate.map(createCar));

    const vehicles = [];

    for (let i = 0; i < vehiclesToCreate.length; i++) {
      vehicles.push(await createCar(vehiclesToCreate[i]));
    }

    console.log("Vehicles created:");
    console.log(vehicles);
    console.log("Finished creating vehicles!");
  } catch (error) {
    console.error("Error creating vehicles!");
    throw error;
  }
}

async function testDBA() {
  try {
    console.log("Starting to test database...");

    console.log("Calling create hub");
    const hub = await createHub({ location: "New York" });
    console.log("Result:", hub);
    console.log("Calling get all hub");
    const allHubs = await getAllHubs();
    console.log("Result:", allHubs);
    const hubById = await getHubById(1);
    console.log("Hub ID LOG:", hubById);
    const hubLocation = await getHubByLocation("Nevada");
    console.log("HUB LOCATION RESULT:", hubLocation);
    const updatedHub = await updateHub(1, "Kansas");
    console.log("UPDATED HUB LOG:", updatedHub);
    const deletedRowCount = await deleteHub(1);
    console.log(`Deleted ${deletedRowCount} hub(s)`);
    const deactivatedHub = await deactivateHub(3);
    console.log(`deactivated ${deactivatedHub} hub(s)`);

    console.log("Calling addTagToCar(1, 1)");
    const tag1 = await addTagToCar(1, 1);
    const tag2 = await addTagToCar(1, 2);
    const tag3 = await addTagToCar(1, 3);
    console.log("addTagToCar(1, 1) Result:", tag1);
    console.log("addTagToCar(1, 2) Result:", tag2);
    console.log("addTagToCar(1, 3) Result:", tag3);

    // console.log("calling removeTagFromCar(1,1)");
    // const removedTag = await removeTagFromCar(1, 1);
    // console.log("removeTagFromCar() Result: ", removedTag);

    console.log("calling getTagsByCar(1)");
    const tags = await getTagsByCar(1);
    console.log("getTagsByCar(1) Result: ", tags);

    console.log("calling getCarsByTag(1)");
    const cars = await getCarsByTag(1);
    console.log("getCarsByTag(1) Result: ", cars);

    console.log("finished testing database");
  } catch (error) {
    console.log(error);
  }
}

async function rebuildDB() {
  await dropTables();
  await createTables();
  await createInitialVehicles();
  await createInitialTags();
  await createInitialUsers();
  await createInitialHubs();
  await testDBA();
  return;
}

rebuildDB();
