const express = require("express");
const inventoryRouter = express.Router();
const { requireUser } = require("./utils");
const {
  getInventoryByHubId,
  addCarToHubInventory,
  removeCarFromHubInventory
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
inventoryRouter.delete("/", async (req, res, next)=>
{
  const {carId, hubId} = req.body;

  try
  {
    if(req.admin)
    {
      const deletedCar = await removeCarFromHubInventory(carId, hubId);

      if(deletedCar) res.send(deletedCar);
      else res.send("error at delete car route")
    }
    else
    {
      res.sendStatus(401);
    }
  }
  catch(e)
  {
    next(e);
  }

})
module.exports = inventoryRouter;

/*
  Need to make add quantity to inventory item
  Need to stop duplicate car adding(router.post if at /:hubId carId=carId res.send("already in inventory"))

*/