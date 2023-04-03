const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

const userRouter = require("./users");
router.use("/users", userRouter);

const inventoryRouter = require("./inventory");
router.use("/inventory", inventoryRouter);

module.exports = router;
