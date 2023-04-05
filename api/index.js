require("dotenv").config();

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const{JWT_SECRET} = process.env;

//sets req.user if an auth token is provided || can be changed if to include checking if the auth is a user or website admin later
router.use(async(req, res, next)=>
{
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if(!auth) next();
  else if(auth.startsWith(prefix))
  {
    const token = auth.slice(prefix.length);
    try
    {
      const {id} = jwt.verify(token, JWT_SECRET);
      if(id)
      {
        req.user = await getUserById(id);
        next();
      }
    }
    catch({name, message})
    {
      next({name, message});
    }
  }
  else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
})



router.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRouter = require("./users");
const tagsRouter = require("./tags");

router.use("/users", userRouter);
router.use("/tags", tagsRouter);

const inventoryRouter = require("./inventory");
router.use("/inventory", inventoryRouter);

const vehiclesRouter = require("./cars");
router.use("/cars", vehiclesRouter);

const carTagsRouter = require("./car-tags");
router.use("/car-tags", carTagsRouter);



const cartRouter = require("./cart");
router.use("/cart", cartRouter);


const hubsRouter = require("./hubs");
const { getUserById } = require("../db/users");
router.use("/hubs", hubsRouter);

module.exports = router;
