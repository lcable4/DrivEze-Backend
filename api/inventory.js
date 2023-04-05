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

inventoryRouter.post("/:hubId", async (req, res, next) => {
  const {carId} = req.body;
  try {
    if(req.admin)
    {
    const { hubId } = req.params;

    const addedCarToHubInventory = await addCarToHubInventory(carId, hubId);

    res.send(addedCarToHubInventory);
    }
    else{
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = inventoryRouter;

/*
  Need to make add quantity to inventory item
  Need to stop duplicate car adding(router.post if at /:hubId carId=carId res.send("already in inventory"))

*/