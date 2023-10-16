const contactMiddleware = require('./contactMiddleware');
const isValidId = require('./isValidId');
const authenticate = require("./authenticate");
const userMiddleware = require('./userMiddleware');
const upload = require("./upload");

module.exports = {
    contactMiddleware,
    isValidId,
    authenticate,
    userMiddleware,
    upload
}