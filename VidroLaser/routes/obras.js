const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const obrasController = require('../controllers/obras-controller');

router.get('/findAll', obrasController.getObras);
router.get('/:idInstalacao', obrasController.getFirstObras);
router.put('/atualizar', obrasController.putObras);
router.delete('/deletar', obrasController.deleteObras);
router.post('/cadastro',obrasController.postObras);
router.get('/aberto/emAberto', obrasController.getObrasAbertas);


module.exports = router;