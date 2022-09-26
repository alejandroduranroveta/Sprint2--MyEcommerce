const express = require('express');
const path = require('path');

const router = express.Router();
const {detail,create,modify,deleted,picturesProduct} = require(path.resolve(__dirname,'../controllers/picturesController'))

router.get('/',picturesProduct) 
router.get('/:id',detail)
router.post('/',create) 
router.put('/:id',modify)
router.delete('/:id',deleted)

module.exports = router;