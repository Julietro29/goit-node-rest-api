import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import contactsController from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", contactsController.listContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateBody, contactsController.addContact);

router.put("/:id", validateBody, contactsController.updateContact);

router.delete("/:id", contactsController.removeContact);

export default router;
