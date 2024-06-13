import express from 'express';
import { getContacts, getContact, deleteContact, createContact, updateContactById } from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import { contactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContact);
router.delete('/:id', deleteContact);
router.post('/', validateBody(contactSchema), createContact);
router.put('/:id', validateBody(updateContactSchema), updateContactById);

export default router;