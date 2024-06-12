import express from "express";
import validateBody from "../helpers/validateBody.js";
import { listContactsHandler, getContactByIdHandler, addContactHandler, updateContactHandler, removeContactHandler } from "../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", listContactsHandler);

router.get("/:id", getContactByIdHandler);

router.post("/", validateBody, addContactHandler);

router.put("/:id", validateBody, updateContactHandler);

router.delete("/:id", removeContactHandler);

export default router;