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

//Post a new tag
//POST /api/tags/
tagsRouter.post("/", async (req, res, next) => {
  try {
    const { tagName } = req.body;
    const tag = await createTag(tagName);
    res.send(tag);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Get all tags
//GET /api/tags/
tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send(tags);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Gets one tag by ID
//GET /api/tags/:id
tagsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tags = await getTagById(id);
    res.send(tags);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Updates one tag by ID
//PATCH /api/tags/:id
tagsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTag = await updateTag({ tagId: id, name });
    res.send(updatedTag);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//Deactivates a tag matching the ID
//PATCH /api/tags/deactivateTag/:id
tagsRouter.patch("/deactivateTag/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowCount = await deactivateTag(id);
    if (rowCount === 1) {
      res.status(200).json({ message: `Tag ${id} has been deactivated.` });
    } else {
      res.status(404).json({ message: `Tag ${id} not found.` });
    }
  } catch ({ name, message }) {
    res.status(500).json({ message: "Internal server error." });
    next({ name, message });
  }
});

//Deletes a tag match the ID
//DELETE /api/tags/deleteTag/:id
tagsRouter.delete("/deleteTag/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTag = await deleteTag(id);
    if (deletedTag) {
      res.status(200).json({ message: `Tag ${id} has been deleted.` });
    } else {
      res.status(404).json({ message: `Tag ${id} was not found` });
    }
  } catch ({ name, message }) {
    res.status(500).json({ message: "Internal server error." });
    next({ name, message });
  }
});

module.exports = tagsRouter;
