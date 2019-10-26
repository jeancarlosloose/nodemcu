const route = new require('express').Router();

const ctrlUnNormalSample = require('../controllers/ctrlUnNormalSample');

route.post('/insertData',ctrlUnNormalSample.insertUnNormal);
route.get('/lastunnormal',ctrlUnNormalSample.getLastRegister);
route.get('/various',ctrlUnNormalSample.getVariousUnNormals);
route.get('/last',ctrlUnNormalSample.getLastNormals);

module.exports = route;