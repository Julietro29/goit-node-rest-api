import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
  }
}

export const getContactById = async (id) => {
  try {
    const data = await listContacts();

    const contact = data.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

export const removeContact = async (id) => {
  try {
    const contact = await getContactById(contactId);
    if (contact === null) {
      return null;
    } else {
      const data = await listContacts();

      const newData = data.filter((contact) => contact.id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
      return contact;
    }
  } catch (error) {
    console.log(error);
  }
}

export const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

export const updateContact = async (id, name, email, phone) => {
  try {
    const existingContact = await getContactById(contactId);
    if (existingContact === null) {
      return null;
    }
    const data = await listContacts();
    const newData = data.map((contact) => {
      if (contact.id !== contactId) {
        return { ...contact };
      }
      return {
        ...contact,
        name: name !== undefined ? name : contact.name,
        email: email !== undefined ? email : contact.email,
        phone: phone !== undefined ? phone : contact.phone,
      };
    });

    await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

    const newContact = await getContactById(contactId);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};