import express from "express";
import validateBody from "../helpers/validateBody.js";
import * as schema from "../services/schemas/contactsSchemas.js";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteStatus,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);
contactsRouter.get("/:id", getOneContact);
contactsRouter.delete("/:id", deleteContact);
contactsRouter.post("/", validateBody(schema.createContactSchema), createContact);
contactsRouter.put("/:id", validateBody(schema.updateContactSchema), updateContact);
contactsRouter.patch("/:id/favorite", validateBody(schema.updateFavoriteSchema), updateFavoriteStatus);

export default contactsRouter;