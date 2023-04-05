const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  // create the pool object
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost/driveZe-dev",
  database: "driveZe-dev",

  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

class client {
  //this Client will prevent timeout errors and open connections
  //keep client private, we don't need to access it directly ever
  #client;

  async connect() {
    // use this before you query the db
    this.#client = await pool.connect();
  }

  async query(
    sql,
    params //to query || follows the same syntax as node pg client.connect("QUERY STRING", params)
  ) {
    if (!this.#client) {
      console.error("PLEASE USE OBJECT.connect(); before running query");
      console.log("Query Will Still Run");
      await this.connect();
    }
    const result = await this.#client.query(sql, params);
    return result;
  }

  async release() {
    //release the connection back to the pool
    await this.#client.release();
  }
}
/*
  await client.connect();
  await client.query();
  await client.release();
*/

module.exports = new client();
