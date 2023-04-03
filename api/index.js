const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRouter = require("./users")

router.use("/users", userRouter);

const vehiclesRouter = require("./cars")
router.use("/cars", vehiclesRouter)

module.exports = router;
