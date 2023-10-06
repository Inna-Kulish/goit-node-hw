const express = require('express');

const router = express.Router();

const { contactController } = require('../../controllers');

const {contactMiddleware, isValidId} = require('../../middlewares')

router.get('/', contactController.getListContacts);

router.get('/:contactId', isValidId, contactController.getContactById);

router.post('/', contactMiddleware.checkCreateContactData, contactController.createContact);

router.put('/:contactId', isValidId, contactMiddleware.checkUpdateContactData, contactController.updateContact);

router.patch('/:contactId/favorite', isValidId, contactMiddleware.checkUpdateStatusContact, contactController.updateStatusContact);

router.delete('/:contactId', isValidId, contactController.deleteContact);

module.exports = router
