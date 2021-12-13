const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const funcController = require('../controllers/funcionarios-controller');


router.get('/findFuncionarios', login.opcional, funcController.getAllFunc );

router.post('/cadastrarFuncionario', /*login.obrigatorio,*/ funcController.postFuncionarios);

router.get('/:idFuncionario', login.opcional, funcController.findbyIdFunc);

router.patch('/alterarFuncionario',/*login.obrigatorio,*/ funcController.patchFuncionario);

router.delete('/deletarFuncionario',/*login.obrigatorio,*/ funcController.deleteFunc);




module.exports = router;