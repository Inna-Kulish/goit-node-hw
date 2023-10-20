const contactMiddleware = require('./contactMiddleware');
const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
    contactMiddleware,
    isValidId,
    validateBody,
    authenticate,
    upload
}