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
  const data = await getListContacts();
  return data.find((item) => item.id === contactId);
};

/**
 * Delete contact
 *
 * @param {string} contactId
 */
const removeContact = async (contactId) => {
  const data = await getListContacts();
  let isFound = false;
  result = data.filter((item) => {
    if(item.id === contactId){
      isFound = true;
      return false
    }
    return true
    });
  if(!isFound) {
    console.log(`\x1B[31mContact ${contactId} not found\x1B[37m`)
    process.exit()
  }
  try {
    return await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
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
  const data = await getListContacts();
  data.push({ name, email, phone, id: crypto.randomUUID() });
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
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
