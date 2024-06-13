import { listContacts, getContactById, removeContact, addContact, updateContact } from '../services/contactsServices.js';
import { HttpError } from '../helpers/HttpError.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.id);
    if (!contact) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw HttpError(400, 'Missing required fields');
    }
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    if (!updatedContact) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};