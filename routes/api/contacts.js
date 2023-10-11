const express = require('express');

const router = express.Router();

const { contactController } = require('../../controllers');

const {contactMiddleware, isValidId, authenticate} = require('../../middlewares')

router.get('/', authenticate, contactController.getListContacts);

router.get('/:contactId', authenticate, isValidId, contactController.getContactById);

router.post('/', authenticate, contactMiddleware.checkCreateContactData, contactController.createContact);

router.put('/:contactId', authenticate, isValidId, contactMiddleware.checkUpdateContactData, contactController.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, contactMiddleware.checkUpdateStatusContact, contactController.updateStatusContact);

router.delete('/:contactId', authenticate, isValidId, contactController.deleteContact);

module.exports = router
