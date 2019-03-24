const express = require("express");
const router = express.Router();
const apiCtrl = require('../controllers/api.controller');

router.route(`/getVehicles`).get(apiCtrl.getVehicles);
router.route(`/startCron`).get(apiCtrl.startCronJob);
router.route(`/stopCron`).get(apiCtrl.startCronJob);

module.exports = router;