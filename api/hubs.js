const express = require("express");
const router = express.Router();
const {getAllHubs}  = require("../db/hubs");


router.get("/", async (req, res, next) => {
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

  router.post("/", requireUser, async (req, res, next) => {
    const { location = "" } = req.body;
  
    const hubData = {
      location
    };
  
    try {
      const hub = await createActivity(hubData);
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

  router.patch("/:hubId", async (req, res, next) => {
    try {
      const { hubId } = req.params;
      const getHubId = await getHubById(hubId);
      if (!getHubId) {
        next({
          name: "not found",
          message: `Hub ${hubId} not found`,
        });
      } else {
        const { location } = req.body;
        try {
          const updatedHub = await updateHub({
            id: hubId,
            location
          });
          res.send(updatedHub);
        } catch (error) {
          next({
            name: "",
            message: `An hub with location ${location} already exists`,
          });
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });