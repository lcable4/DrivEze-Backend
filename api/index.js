const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRouter = require("./users")

router.use("/users", userRouter);

const hubsRouter = require("./hubs");
router.use("/hubs", hubsRouter);
module.exports = router;
