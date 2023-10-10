const express = require("express");
const validationMiddleware = require("../../midllewares/validation");
const schema = require("../../schemas/joiSchema");
const router = express.Router();
const {
  getAll,
  getContact,
  addNew,
  deleteContact,
  update,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", getContact);

router.post("/", validationMiddleware(schema), addNew);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validationMiddleware(schema), update);

module.exports = router;
