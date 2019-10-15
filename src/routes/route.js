const route = new require('express').Router();

const ctrlUnNormalSample = require('../controllers/ctrlUnNormalSample');
const ctrlNormalSample = require('../controllers/ctrlNormalSample');

route.get('/normalsample',ctrlNormalSample.getAll);
route.get('/unnormalsample',ctrlUnNormalSample.getAll);
route.get('/postunnormal',ctrlUnNormalSample.insertEx);
route.get('/lastunnormal',ctrlUnNormalSample.getLastRegister);


module.exports = route;