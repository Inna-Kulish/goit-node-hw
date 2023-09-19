const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

/**
 * Get contacts list
 * @returns {Promise} - get object of contacts
 */
const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

/**
 * Get contact by ID
 * @param {string} contactId - write ID contact
 * @returns {Promise} - get object of contact
 */
const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

/**
 * Add new contact to JSON
 * @param {string} name - write name contact
 * @param {string} email - write email contact
 * @param {string} phone - write phone contact
 * @returns {Promise} - get object of new contact
 */
const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

/**
 * Delete contact by ID
 * @param {string} contactId - write ID contact
 * @returns {Promise} - get object of delete contact
 */
const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

/**
 * Update contact by ID
 * @param {string} contactId - write ID contact
 * @param {object} data - update name, email or phone contact
 * @returns {Promise} - get object of update contact
 */
const updateContactById = async (contactId, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);

    if (index === -1) {
        return null;
    }

    contacts[index] = { id: contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContactById,
}