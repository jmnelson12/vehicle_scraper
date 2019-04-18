const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api.controller");

// Vehicle endpoints
router.route(`/getVehicles`).get(apiCtrl.vehicles.getVehicles);
router.route(`/setFavorite`).post(apiCtrl.vehicles.setFavorite);
router.route(`/removeFavorite`).delete(apiCtrl.vehicles.removeFavorite);
router.route(`/setNotInterested`).post(apiCtrl.vehicles.setNotInterested);
router
	.route(`/removeNotInterested`)
	.delete(apiCtrl.vehicles.removeNotInterested);
router.route(`/getMakes`).get(apiCtrl.vehicles.getMakes);
router.route(`/getModels`).get(apiCtrl.vehicles.getModels);

// Cron job endpoints
// router.route(`/startCron`).get(apiCtrl.startCron);
// router.route(`/stopCron`).get(apiCtrl.stopCron);

// User Auth Endpoints
router.route(`/login`).post(apiCtrl.userAuth.login);
router.route(`/logout`).get(apiCtrl.userAuth.logout);
router.route(`/register`).post(apiCtrl.userAuth.register);
router.route(`/verify`).get(apiCtrl.userAuth.verify);
router.route(`/deleteUser`).delete(apiCtrl.userAuth.delete);

module.exports = router;
