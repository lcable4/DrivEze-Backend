const express = require("express");
const hubsRouter = express.Router();
const {
  getAllHubs,
  createHub,
  getHubById,
  updateHub,
  deleteHub,
} = require("../db/hubs");

hubsRouter.get("/", async (req, res, next) => {
  try {
    const allHubs = await getAllHubs();
    const hubs = allHubs.filter((hub) => {
      return hub;
    });

    res.send(hubs);
  } catch ({ location }) {
    next({ location });
  }
});

hubsRouter.post("/", async (req, res, next) => {
  const { location = "" } = req.body;

  const hubData = {
    location,
  };

  try {
    const hub = await createHub(hubData);
    if (hub) {
      res.send(hub);
    } else {
      next({ name: "hubCreationError", message: "Error creating hub." });
    }
  } catch ({ name, message }) {
    next({
      name,
      message: `An activity with name ${hubData.hub} already exists`,
    });
  }
});

hubsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    const updatedHub = await updateHub({ hubId: id, location });
    res.send(updatedHub);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

hubsRouter.delete("/deleteHub/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedHub = await deleteHub(id);
    if (deletedHub) {
      res.status(200).json({ message: `Hub ${id} was deleted.` });
    } else {
      res.status(404).json({ message: `Hub ${id} could not be found` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
    next(error);
  }
});

module.exports = hubsRouter;