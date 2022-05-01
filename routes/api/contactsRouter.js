const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addPostValidation,
  patchPostValidation,
} = require("../../middlewares/validMiddleware");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(JSON.parse(data));

  next();
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!req.params.contactId) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json(data);

  next();
});

router.post("/", addPostValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ status: "success", newContact });

  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(req.params.contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }

  next();
});

router.put("/:contactId", addPostValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }

  next();
});

router.patch("/:contactId", patchPostValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }

  next();
});

module.exports = router;
