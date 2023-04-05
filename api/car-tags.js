const express = require("express");
const carTagsRouter = express.Router();
const { requireUser } = require("./utils");
const {
  addTagToCar,
  removeTagFromCar,
  getTagsByCar,
  getCarsByTag,
} = require("../db/car-tags");
const { getCarById } = require("../db/cars");
const { getTagById } = require("../db/tags");

carTagsRouter.use((req, res, next) => {
  console.log("a request is being made to /car-tags");

  next();
});

carTagsRouter.get("/", (req, res, next) => {
  res.send("hello world");
  next();
});
//this route needs to be changed! || can just be post("/") and req.body{tagId, carId}
carTagsRouter.post("/add-tag/:tagId/:carId", async (req, res, next) => {
  try {
    if(req.admin)
    {
    const { tagId, carId } = req.params;
    const checkCarId = await getCarById(carId);
    if (!checkCarId) {
      next({
        name: "carDoesNotExist",
        message: `a car with id: ${carId} does not exist`,
      });
    } else {
      const checkTagId = await getTagById(tagId);
      if (!checkTagId) {
        next({
          name: "tagDoesNotExist",
          message: `a tag with id: ${tagId} does not exist`,
        });
      } else {
        const carTag = await addTagToCar(carId, tagId);
        console.log(carTag, " carTag!");

        if (carTag) {
          res.send(carTag);
        } else {
          next({
            name: "errorAddingTagsToCar",
            message: `error adding tagId: ${tagId} to carId: ${carId}`,
          });
        }
      }
    }
  }
  else
  {
    res.sendStatus(401);
  }
  } catch (error) {
    next(error);
  }
});
//this route also needs to be changed || .delete(/) req.body{tagId, carId}
carTagsRouter.delete("/delete/:tagId/:carId", async (req, res, next) => {
  try {
    if(req.admin)
    {
    const { tagId, carId } = req.params;

    const deletedCar = await removeTagFromCar(tagId, carId);

    res.send(deletedCar);
    }
    else
    {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
//this route should probably be moved to into the /api/cars route
carTagsRouter.get("/tags-by-car/:carId", async (req, res, next) => {
  try {
    const { carId } = req.params;

    const tags = await getTagsByCar(carId);

    res.send(tags);
  } catch (error) {
    next(error);
  }
});
//this route could be changed to .get(/:tagId) if getTagsByCar is moved
carTagsRouter.get("/cars-by-tag/:tagId", async (req, res, next) => {
  try {
    const { tagId } = req.params;

    const cars = await getCarsByTag(tagId);

    res.send(cars);
  } catch (error) {
    next(error);
  }
});

module.exports = carTagsRouter;
