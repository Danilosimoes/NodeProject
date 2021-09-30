const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


const carsController = require('../controllers/cars-controller');


router.get('/', carsController.getAllCars);

router.post('/', carsController.postCars);

router.get('/:idCar', carsController.getOneCar);

router.delete('/', carsController.deleteCar);


module.exports = router;