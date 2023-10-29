const express = require("express");
const validationMiddleware = require("../../midllewares/validation");
const castError = require("../../midllewares/castError");
const schema = require("../../schemas/joiContactSchema");
const favoriteSchema = require("../../schemas/joiFavoriteSchema");
const router = express.Router();
const {
  getAll,
  getContact,
  addNew,
  deleteContact,
  toFavorite,
  update,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", castError, getContact);

router.post("/", validationMiddleware(schema), addNew);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", castError, validationMiddleware(schema), update);

router.patch(
  "/:contactId/favorite",
  castError,
  validationMiddleware(favoriteSchema),
  toFavorite
);

module.exports = router;
