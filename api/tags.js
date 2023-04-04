const express = require("express");

const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deactivateTag,
  deleteTag,
} = require("../db/tags");
const tagsRouter = express.Router();

//POST /api/tags/
tagsRouter.post("/", async (req, res, next) => {
  try {
    const { tagName } = req.body;
    const tag = await createTag(tagName);
    res.send(tag);
  } catch (error) {
    next(error);
  }
});

//GET /api/tags/
tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send(tags);
  } catch (error) {
    next(error);
  }
});

module.exports = tagsRouter;
