const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const indexToRemove = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexToRemove === -1) {
    return null;
  }
  const filteredContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  return filteredContacts;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  const newContacts = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return newContact;
};
const updateContact = async (contactId, { name, email, phone }) => {
  const allContacts = await listContacts();
  const indexToUpdate = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexToUpdate === -1) {
    return null;
  }
  const updatedContact = {
    id: contactId,
    name: name || allContacts[indexToUpdate].name,
    email: email || allContacts[indexToUpdate].email,
    phone: phone || allContacts[indexToUpdate].phone,
  };
  allContacts[indexToUpdate] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return updatedContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
