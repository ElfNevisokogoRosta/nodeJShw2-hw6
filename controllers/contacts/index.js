const getAll = require("./contactList");
const getContact = require("./getContact");
const addNew = require("./addContact");
const deleteContact = require("./deleteContact");
const update = require("./updateContact");
const toFavorite = require("./toFavorite");
const { controllerWrapper } = require("../../utils/index");
module.exports = {
  getAll: controllerWrapper(getAll),
  getContact: controllerWrapper(getContact),
  addNew: controllerWrapper(addNew),
  deleteContact: controllerWrapper(deleteContact),
  toFavorite: controllerWrapper(toFavorite),
  update: controllerWrapper(update),
};
