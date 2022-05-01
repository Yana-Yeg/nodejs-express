const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  putContact,
  patchContact,
} = require("../../models/contacts");

const {
  addPostValidation,
  patchPostValidation,
} = require("../../middlewares/validMiddleware");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(JSON.parse(data));

  next();
});

router.get("/:contactId", async (req, res, next) => {
  // console.log(req.params.id);
  const data = await getContactById(req.params.id);
  res.json(JSON.parse(data));

  next();
});

router.post("/", addPostValidation, async (req, res, next) => {
  // const { username, email, phone } = req.body;
  await addContact(req.body);
  res.json({ message: "contact has already added" });

  next();
});

router.delete("/:contactId", async (req, res, next) => {
  await removeContact(req.params.id);
  res.json({
    message: `contact with id '${req.params.id}' has already deleted`,
  });

  next();
});

router.put("/:contactId", addPostValidation, async (req, res, next) => {
  await putContact(req.params.id, req.body);
  res.json({
    message: `contact with id '${req.params.id}' has already changed`,
  });

  next();
});

router.patch("/:contactId", patchPostValidation, async (req, res, next) => {
  await patchContact(req.params.id, req.body);
  res.json({
    message: `contact with id '${req.params.id}' has already changed`,
  });

  next();
});

module.exports = router;
