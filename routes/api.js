const express = require("express");
const router = express.Router();
const apiCtrl = require("../controllers/api.controller");

router.route(`/getVehicles`).get(apiCtrl.getVehicles);
router.route(`/setFavorite`).post(apiCtrl.setFavorite);

module.exports = router;
