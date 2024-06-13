import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const contactsPath = path.resolve('db', 'contacts.json');

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error('Error getting contact by ID:', error);
    return null;
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.error('Error removing contact:', error);
    return null;
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error('Error adding contact:', error);
    return null;
  }
};

export const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) return null;
    contacts[index] = { ...contacts[index], name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.error('Error updating contact:', error);
    return null;
  }
};