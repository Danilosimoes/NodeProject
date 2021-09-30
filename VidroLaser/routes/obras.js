const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const obrasController = require('../controllers/obras-controller');

router.get('/', obrasController.getObras);
router.post('/',obrasController.postObras);
router.get('/:idInstalacao', obrasController.getFirstObras);
router.put('/', obrasController.putObras);
router.delete('/', obrasController.deleteObras);


module.exports = router;