const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const funcController = require('../controllers/funcionarios-controller');


router.get('/', login.opcional, funcController.getAllFunc );

router.post('/', /*login.obrigatorio,*/ funcController.postFuncionarios);

router.get('/:idFuncionario', login.opcional, funcController.findbyIdFunc);

router.patch('/',/*login.obrigatorio,*/ funcController.patchFuncionario);

router.delete('/',/*login.obrigatorio,*/ funcController.deleteFunc);




module.exports = router;