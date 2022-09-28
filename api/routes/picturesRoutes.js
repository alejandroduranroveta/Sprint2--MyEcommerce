const express = require('express');
const path = require('path');
const router = express.Router();
const isAdmin = require("../middlewares/isAdmin");
const verifyJWT = require("../middlewares/verifyJWT");
const {detail,create,modify,deleted,picturesProduct} = require(path.resolve(__dirname,'../controllers/picturesController'));

router.get('/',verifyJWT,isAdmin,picturesProduct);
router.get('/:id',verifyJWT,isAdmin,detail);
router.post('/',verifyJWT,isAdmin,create);
router.put('/:id',verifyJWT,isAdmin,modify);
router.delete('/:id',verifyJWT,isAdmin,deleted);

module.exports = router;