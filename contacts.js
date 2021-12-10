const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

/**
 * Get contacts list
 * *
 * @returns {promise} Array contacts
 */
const getListContacts = async () => {
  try {
    const content = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

/**
 * Get one contact
 *
 * @param {string} contactId
 * @returns {promise} contact obj
 */
const getContactById = async (contactId) => {
  try {
    const data = await getListContacts();
    return data.find((item) => item.id === contactId);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

/**
 * Delete contact
 *
 * @param {string} contactId
 */
const removeContact = async (contactId) => {
  try {
    const data = await getListContacts();
    result = data.filter((item) => item.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

/**
 * Add contact
 *
 * @param {string} name
 * @param {string} email
 * @param {string} phone
 */
const addContact = async (name, email, phone) => {
  try {
    const data = await getListContacts();
    data.push({ name, email, phone, id: crypto.randomUUID() });
    fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
