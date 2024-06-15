import * as contactsServices from "../services/contactsServices.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllContacts = async (req, res) => {
    return res.json(await contactsServices.listContacts());
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const data = await contactsServices.getContactById(id);
    if (!data) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    const data = await contactsServices.removeContact(id);
    if (!data) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.json({ message: "Contact deleted" });
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const data = await contactsServices.addContact(name, email, phone);
    return res.status(201).json(data);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Body must have at least one field" });
    }
    const data = await contactsServices.updateContact(id, req.body);
    if (!data) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
};

export const updateFavoriteStatus = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    if (!req.body.favorite && req.body.favorite !== false) {
        return res.status(400).json({ message: "Missing field favorite" });
    }
    const data = await contactsServices.updateStatusContact(id, req.body);
    if (!data) {
        return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
};