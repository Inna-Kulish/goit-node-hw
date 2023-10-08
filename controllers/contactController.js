const { catchAsync, HttpError } = require("../helpers");
const Contact = require("../models/contactModel");

exports.getListContacts = catchAsync(async (req, res, next) => {
  const result = await Contact.find();

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
  const result = await Contact.create(req.body);

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
  console.log(contactId);
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