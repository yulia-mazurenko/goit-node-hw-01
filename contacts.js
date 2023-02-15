const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "/contacts.json");

async function getAllContacts() {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  return allContacts;
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const contactById = contacts.find((item) => item.id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const resultContactsList = contacts.filter((_, idx) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(resultContactsList));
  return contacts[index];
}

async function addContact(name, email, phone) {
  const contacts = await getAllContacts();
  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { getAllContacts, getContactById, removeContact, addContact };
