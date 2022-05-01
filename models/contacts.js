const fs = require("fs/promises");
const path = require("path");
// const { uuid } = require("uuidv4");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = () => {
  try {
    const data = fs.readFile(contactsPath, "utf-8");
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactsById = JSON.parse(contacts).find(
      (obj) => obj.id === String(contactId)
    );
    return contactsById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = JSON.parse(contacts).filter(
      (obj) => obj.id !== String(contactId)
    );
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);
    const nextIdNumber = Number(parseContacts[parseContacts.length - 1].id) + 1;

    const newContact = {
      id: String(nextIdNumber),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    parseContacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const putContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);

    const changeContact = {
      id: body.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    parseContacts
      .filter((contact) => contact.id !== contactId)
      .push(changeContact);

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const patchContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);

    parseContacts.forEach((contact) => {
      if (contact.id === contactId) {
        if (body.username) {
          contact.username = body.username;
        }
        if (body.email) {
          contact.email = body.email;
        }
        if (body.phone) {
          contact.phone = body.phone;
        }
      }
    });

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  putContact,
  patchContact,
};
