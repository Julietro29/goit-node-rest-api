import * as services from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

export const listContacts = async (req, res, next) => {
  try {
    const contacts = await services.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(HttpError(500, 'Server error'));
  }
};

export const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await services.getContactById(id);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(HttpError(500, 'Server error'));
  }
};

export const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await services.removeContact(id);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(HttpError(500, 'Server error'));
  }
};

export const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const contact = await services.addContact(name, email, phone);
    res.status(201).json(contact);
  } catch (error) {
    next(HttpError(500, 'Server error'));
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const contact = await services.updateContact(id, data);
    if (!contact) {
      return next(HttpError(404, 'Not found'));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(HttpError(500, 'Server error'));
  }
};
