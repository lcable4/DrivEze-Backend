const express = require("express");
const router = express.Router();
const { getAllHubs } = require("../db");


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