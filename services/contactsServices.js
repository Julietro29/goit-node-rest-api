import Contact from "../models/contactModel.js";

export async function listContacts() {
    return await Contact.find();
}

export async function getContactById(contactId) {
    return await Contact.findById(contactId);
}

export async function removeContact(contactId) {
    return await Contact.findByIdAndRemove(contactId);
}

export async function addContact(name, email, phone) {
    const newContact = new Contact({ name, email, phone });
    return await newContact.save();
}

export async function updateContact(contactId, body) {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}

export async function updateStatusContact(contactId, body) {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}