const express = require('express');
const router =express.Router();
const userController = require("../controllers/userController")
const isGod = require("../middlewares/isGod");
const isAdmin = require("../middlewares/isAdmin");
const verifyJWT = require('../middlewares/verifyJWT');



