const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const carsController = require('../controllers/cars-controller');


router.get('/findAllCars', carsController.getAllCars);

router.post('/cadastrar', carsController.postCars);

router.get('/:idCar', carsController.getOneCar);

router.delete('/deletarCarro', carsController.deleteCar);


module.exports = router;