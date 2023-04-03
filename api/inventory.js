const express = require("express");
const inventoryRouter = express.Router();
const { requireUser } = require("./utils");
const {
  getInventoryByHubId,
  addCarToHubInventory,
} = require("../db/inventory");

inventoryRouter.use((req, res, next) => {
  console.log("A request is being made to /inventory");

  next();
});

inventoryRouter.get("/", (req, res, next) => {
  res.send("hello world");
  next();
});

inventoryRouter.get("/:hubId", async (req, res, next) => {
  try {
    const { hubId } = req.params;
    const hubInventory = await getInventoryByHubId(hubId);
    res.send(hubInventory);
  } catch (error) {
    next(error);
  }
});

inventoryRouter.post("/:hubId/:carId", async (req, res, next) => {
  try {
    const { hubId, carId } = req.params;

    const addedCarToHubInventory = await addCarToHubInventory(carId, hubId);

    res.send(addedCarToHubInventory);
  } catch (error) {
    next(error);
  }
});

module.exports = inventoryRouter;
