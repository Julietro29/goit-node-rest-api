import { Router } from 'express';
import * as controllers from '../controllers/contactsControllers.js';
import validateBody from "../helpers/validateBody.js";
import { contactSchema, updateContactSchema } from '../schemas/contactsSchemas.js';

const router = Router();

router.get('/', controllers.listContacts);
router.get('/:id', controllers.getContactById);
router.post('/', validateBody(contactSchema), controllers.addContact);
router.delete('/:id', controllers.removeContact);
router.put('/:id', validateBody(updateContactSchema), controllers.updateContact);

export default router;