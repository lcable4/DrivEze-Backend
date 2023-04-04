const express = require("express");
const router = express.Router();

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

module.exports = router;
