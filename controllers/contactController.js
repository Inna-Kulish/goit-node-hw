const { catchAsync, HttpError } = require("../helpers");
const Contact = require("../models/contactModel");

const contactService = require('../services/contactService');

exports.getListContacts = catchAsync(async (req, res, next) => {
  const result = await contactService.getContacts(req.query, req.user);
  
  res.json(result);
});

exports.getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

exports.createContact = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({...req.body, owner});

  res.status(201).json(result);
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
})

exports.updateStatusContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
})

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
      message: 'Contact deleted'
    });
})