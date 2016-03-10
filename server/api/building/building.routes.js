'use strict';

var controller = require('./building.controller');

var express = require('express')
var router = express.Router();

router.post('/building', controller.createBuilding);
router.put('/building/:id', controller.updateBuilding);
router.get('/building', controller.findAllBuildings);
router.get('/building/:id', controller.findBuildingById);
router.delete('/building/:id', controller.deleteBuildingById);

module.exports = router;