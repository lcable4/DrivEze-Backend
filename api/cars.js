const express = require("express");
const vehiclesRouter = express.Router();
const { requireUser } = require("./utils");
const {
    createCars,
    updateCars,
    getAllCars,
    getCarById,
    getCarsByHubLocation,
    deleteCar,
    getCarsByTag,
    deactivateCar,
} = require("../db");

// Get /api/cars/:id
vehiclesRouter.get("/:id",requireUser, async (req, res, next) => {
    try {
        const result = await getCarById();
        res.send(result)
    } catch({name,message}) {
        next({name,message});
    }
});
// Get /api/cars
vehiclesRouter.get("/", async (req, res, next) => {
    try {
        const result = await getAllCars();
        res.send(result);
    } catch ({name, message}) {
        next({name,message});
    }
});

//Post /api/cars
vehiclesRouter.post("/", requireUser, async (req,res, next) => {
    const {name, description, daily_rate, hubLocation} = req.body;
    const creatorId = req.user.id;
    const data = {
        authorId: req.user.id,
        creatorId,
        name,
        description,
        daily_rate,
        hubLocation,
    };

    try {
        const post = await createCars(data);
        if (post){
            res.send(post);
        }else {
            next({name: "Car Error", message: "Error creating cars"});
        }
    } catch ({name,message}){
        next({
            name,
            message: `A Car with ${data,name} already exits`
        });
    }
});

// Delete /api/user/id
vehiclesRouter.delete("/:cars-tags", requireUser, async (req, res, next) => {
    try{
        const {id} = req.params;
        const routine = await getCarById(id);
        console.log(routine, "id log")
        console.log(req.user, "req user log")
        if (!routine) {
            next({
              name: "Error",
              message: "Car does not exist!",
            });
          } else if (routine.creatorId !== req.user.id) {
            console.log("HERE")
            res.status(403);
            next({
              name: "Delete Error",
              message: "This Post does not belong to you.",
            });
            
          } else {
            const deletecar = await deleteCar(id);
            res.send(routine);
            console.log("HELLO")
          }
        } catch ({ name, message }) {
          next({ name, message });
        }
})