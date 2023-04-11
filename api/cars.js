const express = require("express");
const vehiclesRouter = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  deleteCar,
  updateCar,
} = require("../db/cars");

// Get /api/cars/:id
vehiclesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getCarById(id);
  res.send(result);
});
// Get /api/cars
vehiclesRouter.get("/", async (req, res) => {
  const result = await getAllCars();
  console.log(result, "result");
  res.send(result);
});

//Post /api/cars
vehiclesRouter.post("/", async (req, res, next) => {
  if (req.admin) {
    const { name, description, daily_rate, hubLocation, image } = req.body;
    const data = {
      name,
      description,
      daily_rate,
      hubLocation,
      image
    };
    const post = await createCar(data);
    if (post) {
      res.send(post);
    } else {
      next({ name: "Car Error", message: "Error creating cars" });
    }
  } else {
    res.sendStatus(401);
  }
});

vehiclesRouter.patch("/", async (req, res, next) => {
  const carId =  req.body.carId;
  const fields = req.body;
  console.log(carId);
  try {
    if (req.admin) {
      const car = await updateCar({ carId, ...fields });
      res.send(car);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    throw e;
  }
});

// Delete /api/car
vehiclesRouter.delete("/", async (req, res, next) => {
  const { carId } = req.body;

  try {
    if (req.admin) {
      const { id } = req.params;
      const routine = await getCarById(carId);
      console.log(routine, "id log");
      const deletecar = await deleteCar(carId);
      res.send(deletecar);
    } else {
      res.sendStatus(401);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = vehiclesRouter;
