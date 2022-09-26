const express = require('express');
const path = require('path')
const {list,detail,create,modify,mostwanted,deleted} = require(path.resolve(__dirname,'../controllers/productsController'))
const {picturesProduct} = require(path.resolve(__dirname,'../controllers/picturesController'))
const router = express.Router();
const isGod = require("../middlewares/isGod");
const isGuest = require("../middlewares/isGuest");
const isAdmin = require("../middlewares/isAdmin");
const verifyJWT = require("../middlewares/verifyJWT");

//router.get('/search',verifyJWT,isGuest,list);
router.get('/search',list);
//router.get('/mostwanted',verifyJWT,isGuest,mostwanted);
router.get('/mostwanted',mostwanted);

//router.get('/',verifyJWT,isGuest,list); //aca hace listado y ademas hace la busqueda por categor
router.get('/',list); //aca hace listado y ademas hace la busqueda por categor

//router.post('/',verifyJWT,isGod,create);
router.post('/',create);

//router.put('/:id',verifyJWT,isAdmin,modify);
router.put('/:id',modify); 

//router.get('/:id',verifyJWT,isAdmin,detail);
router.get('/:id',detail);
//router.delete('/:id',verifyJWT,isGod,deleted);
router.delete('/:id',deleted);

//router.get('/:id/pictures',verifyJWT,isAdmin,picturesProduct);//muestra la lista de pictures de un id


module.exports = router;