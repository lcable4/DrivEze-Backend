const client = require("./index");

const {createUser} = require("./users");
const {createCar} = require("./cars");
const {createHub} = require("./hubs");
const {createTag} = require("./tags");


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
        name VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE car_tags(
        id SERIAL PRIMARY KEY,
        carId INTEGER REFERENCES cars(id),
        tagId INTEGER REFERENCES tags(id),
        UNIQUE(carId, tagId)
      );
      
      CREATE TABLE hubs(
        id SERIAL PRIMARY KEY,
        location VARCHAR(255) UNIQUE NOT NULL
      );
      
      CREATE TABLE inventory(
        id SERIAL PRIMARY KEY,
        hubId INTEGER REFERENCES hubs(id),
        carId INTEGER REFERENCES cars(id),
        UNIQUE(carId, hubId)
      );
      
      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "isOrdered" BOOLEAN DEFAULT false
      );
      
      CREATE TABLE cart_items(
        id SERIAL PRIMARY KEY,
        cartId INTEGER REFERENCES cart(id),
        carId INTEGER REFERENCES cars(id),
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
      const users = await Promise.all(usersToCreate.map(createUser));
  
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

      for(let i = 0; i < hubsToCreate.length; i++)
      {
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

      for(let i = 0; i < tagsToCreate.length; i++)
      {
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
          category: "car",
        },
        {
          name: "Toyota Camry",
          description: "high-mpg sedan",
          daily_rate: 100,
          hubLocation: "Arizona",
          category: "car",
        },
        {
          name: "Honda Civic",
          description: "high-mpg sedan",
          daily_rate: 100,
          hubLocation: "Texas",
          category: "car",
        },
        {
          name: "Chevrolet Silverado",
          description: "powerful truck",
          daily_rate: 150,
          hubLocation: "Nevada",
          category: "truck",
        },
        {
          name: "Ford F-150",
          description: "powerful truck",
          daily_rate: 150,
          hubLocation: "Colorado",
          category: "truck",
        },
        {
          name: "Ram 1500",
          description: "powerful truck",
          daily_rate: 150,
          hubLocation: "Arizona",
          category: "truck",
        },
        {
          name: "Jeep Wrangler",
          description: "off-road SUV",
          daily_rate: 200,
          hubLocation: "Nevada",
          category: "SUV",
        },
        {
          name: "Toyota 4Runner",
          description: "off-road SUV",
          daily_rate: 200,
          hubLocation: "Colorado",
          category: "SUV",
        },
        {
          name: "Chevrolet Tahoe",
          description: "family SUV",
          daily_rate: 175,
          hubLocation: "Texas",
          category: "SUV",
        },
        {
          name: "Tesla Model S",
          description: "luxury electric sedan",
          daily_rate: 400,
          hubLocation: "Nevada",
          category: "luxury",
        },
        {
          name: "BMW 7 Series",
          description: "luxury sedan",
          daily_rate: 350,
          hubLocation: "Colorado",
          category: "luxury",
        },
        {
          name: "Mercedes-Benz S-Class",
          description: "luxury sedan",
          daily_rate: 350,
          hubLocation: "Texas",
          category: "luxury",
        },
        {
          name: "Mercedes-Benz GLS",
          description: "luxury SUV",
          daily_rate: 400,
          hubLocation: "Nevada",
          category: "luxury",
        },
        {
          name: "Range Rover",
          description: "luxury SUV",
          daily_rate: 400,
          hubLocation: "Colorado",
          category: "luxury",
        },
        {
          name: "Lamborghini Urus",
          description: "luxury SUV",
          daily_rate: 500,
          hubLocation: "Texas",
          category: "luxury",
        },
      ];
      //const vehicles = await Promise.all(vehiclesToCreate.map(createCar));
      
      const vehicles = [];

      for(let i = 0; i < vehiclesToCreate.length; i++)
      {
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
  async function rebuildDB()
  {
    await dropTables();
    await createTables();
    await createInitialVehicles();
    await createInitialTags();
    await createInitialUsers();
    await createInitialHubs();
    return;
  }

  rebuildDB();