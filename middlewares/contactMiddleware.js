const { catchAsync, HttpError, contactValidators } = require('../helpers');
const Contact = require('../models/contactModel');

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

const contactExists = await Contact.exists({ name: value.name });

  if (contactExists) throw HttpError(409, 'Contact name already exists..');

  req.body = value;

  next();
});

exports.checkUpdateContactData = (req, res, next) => {
const { error } = contactValidators.updateContactDataValidator(req.body);
    const emptyBody = !Object.keys(req.body).length;
    
    if (emptyBody) {
      throw HttpError(400, 'Missing fields');
    }

    if (error) {
      throw HttpError(400, error.message);
    }

  next();
}

exports.checkUpdateStatusContact = (req, res, next) => {
  const { error } = contactValidators.updateFavoriteSchema(req.body);

  if (error) {
    throw HttpError(400, 'Missing field favorite');
  }

  next();
}