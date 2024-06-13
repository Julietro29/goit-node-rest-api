import express from 'express';
import validateBody from '../helpers/validateBody.js';
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactsControllers.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getOneContact);
router.post('/', validateBody, createContact);
router.put('/:id', validateBody, updateContact);
router.delete('/:id', deleteContact);

export default router;