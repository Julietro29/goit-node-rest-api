import * as contactsServices from "../services/contactsServices.js";
import mongoose from "mongoose";
import HttpError from "../helpers/HttpError.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllContacts = async (req, res, next) => {
    try {
        const data = await contactsServices.listContacts();
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw HttpError(400, "Invalid ID");
        }
        const data = await contactsServices.getContactById(id);
        if (!data) {
            throw HttpError(404, "Not found");
        }
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw HttpError(400, "Invalid ID");
        }
        const data = await contactsServices.removeContact(id);
        if (!data) {
            throw HttpError(404, "Not found");
        }
        return res.json({ message: "Contact deleted" });
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const data = await contactsServices.addContact(name, email, phone);
        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw HttpError(400, "Invalid ID");
        }
        if (Object.keys(req.body).length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }
        const data = await contactsServices.updateContact(id, req.body);
        if (!data) {
            throw HttpError(404, "Not found");
        }
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

export const updateFavoriteStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            throw HttpError(400, "Invalid ID");
        }
        if (typeof req.body.favorite !== "boolean") {
            throw HttpError(400, "Missing field favorite");
        }
        const data = await contactsServices.updateStatusContact(id, req.body);
        if (!data) {
            throw HttpError(404, "Not found");
        }
        return res.json(data);
    } catch (error) {
        next(error);
    }
};