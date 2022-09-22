const express = require('express');
const fs = require('fs');
const {cartById, editCart} = require('../controllers/cartsController');
const verifyJWT = require("../middlewares/verifyJWT");


const router = express.Router();

router.get('/:id',verifyJWT, cartById);
router.put('/:id',verifyJWT, editCart);



module.exports = router;