const express = require('express');
const router =express.Router();
const userController = require("../controllers/userController")
const isGod = require("../middlewares/isGod");
const isAdmin = require("../middlewares/isAdmin");
const verifyJWT = require('../middlewares/verifyJWT');



router.post("/login",userController.login);
router.get("/",verifyJWT,isAdmin,userController.list);
router.get("/:id",verifyJWT,isAdmin,userController.searchById);
router.post("/",verifyJWT,isGod,userController.createUser);
router.put("/:id",verifyJWT,isGod,userController.modifyUser);
router.delete("/:id",verifyJWT,isGod,userController.delete);

module.exports = router;