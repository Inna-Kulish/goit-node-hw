const express = require('express');

const router = express.Router();

const {contactController} = require('../../controllers');

router.get('/', contactController.getListContacts);

router.get('/:contactId', contactController.getContactById);

router.post('/', contactController.createContact);

router.put('/:contactId', contactController.updateContact);

router.delete('/:contactId', contactController.deleteContact);

module.exports = router
