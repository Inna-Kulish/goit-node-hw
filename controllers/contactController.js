const contacts = require('../models/contacts');
const { HttpError, contactValidators } = require('../helpers');

exports.getListContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result);
  }
  catch (error) {
    next(error);
  }
}

exports.getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
    }
  catch (error) {
    next(error);
  }
}

exports.createContact = async (req, res, next) => {
  try {
    const { error } = contactValidators.createContactDataValidator(req.body);
    
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error)
  }
}

exports.updateContact = async (req, res, next) => {
  try {
    const { error } = contactValidators.createContactDataValidator(req.body);
    const emptyBody = !Object.keys(req.body).length;
    
    if (emptyBody) {
      throw HttpError(400, 'Missing fields');
    }

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contacts.updateContactById(contactId, req.body);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
}

exports.deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if(!result) {
      throw HttpError(404, 'Not found');
    }
    
    res.json({
      message: 'Contact deleted'
    });
  }
  catch (error) {
    next(error);
  }
}