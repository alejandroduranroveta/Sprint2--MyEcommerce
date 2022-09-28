const express = require('express');
const router = express.Router();
const categoryController = require("../../api/controllers/categoryController");

router.get('/',categoryController.list);
router.post('/',categoryController.create);
router.delete('/:id',categoryController.delete);

module.exports = router;