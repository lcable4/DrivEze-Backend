const express = require("express");
const vehiclesRouter = express.Router();
const { requireUser } = require("./utils");
const {
    createCar,
    updateCars,
    getCarById,
    getCarsByHubLocation,
    deleteCar,
    getCarsByTag,
    deactivateCar,
} = require("../db/cars");

const {getAllCars} =require("../db/cars")

// Get /api/cars/:id
vehiclesRouter.get("/:id", async (req, res, next) => {

    const {id} = req.params
    const result = await getCarById(id);
    res.send(result)
    
});
// Get /api/cars
vehiclesRouter.get("/", async (req, res, next) => {
    
    const result = await getAllCars();
    console.log(result, "result")
    res.send(result);
   
     
});

//Post /api/cars
vehiclesRouter.post("/", async (req,res, next) => {
    const {name, description, daily_rate, hubLocation} = req.body;
    const data = {
        name,
        description,
        daily_rate,
        hubLocation,
    };

        const post = await createCar(data);
        if (post){
            res.send(post);
        }else {
            next({name: "Car Error", message: "Error creating cars"});
        }
    
  
    
});

// Delete /api/car/id
vehiclesRouter.delete("/:id", async (req, res, next) => {
    try{
        const {id} = req.params;
        const routine = await getCarById(id);
        console.log(routine, "id log")
        //  console.log(req.user, "req user log")
        // if (!routine) {
        //     next({
        //       name: "Error",
        //       message: "Car does not exist!",
        //      });
        //   } else if (routine.creatorId !== req.user.id) {
        //      console.log("HERE")
        //      res.status(403);
        //      next({
        //       name: "Delete Error",
        //        message: "This Car does not belong to you.",
        //      });
            
        //   } else {
        //     const deletecar = await deleteCar(id);
        //     res.send(routine);
        //     console.log("HELLO")
        //   }
        const deletecar = await deleteCar(id);
             res.send(routine);
             console.log("HELLO")
        } catch ({ name, message }) {
          next({ name, message });
        }
})

module.exports = vehiclesRouter;