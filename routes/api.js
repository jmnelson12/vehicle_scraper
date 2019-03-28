const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api.controller");

router.route(`/getVehicles`).get(apiCtrl.getVehicles);
router.route(`/setFavorite`).post(apiCtrl.setFavorite);
router.route(`/startCron`).get(apiCtrl.startCron);
router.route(`/stopCron`).get(apiCtrl.stopCron);

module.exports = router;
