import {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
} from '../services/contactsServices.js';

const listContactsHandler = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContactHandler = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const removeContactHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await removeContact(id);
    if (!removedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

export default {
  listContactsHandler,
  getContactByIdHandler,
  addContactHandler,
  updateContactHandler,
  removeContactHandler
};