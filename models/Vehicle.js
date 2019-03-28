const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
	price: {
		type: String,
		default: ""
	},
	location: {
		type: String,
		default: ""
	},
	title: {
		type: String,
		default: ""
	},
	distance: {
		type: Number,
		default: 0
	},
	detailsFull: {
		type: String,
		default: ""
	},
	mileage: {
		type: String,
		default: ""
	},
	external_id: {
		type: String,
		default: ""
	},
	vin: {
		type: String,
		default: ""
	},
	id: {
		type: String,
		default: ""
	},
	seller_type: {
		type: String,
		default: ""
	},
	url: {
		type: String,
		default: ""
	},
	img: {
		type: String,
		default: ""
	},
	date: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model("Vehicle", VehicleSchema);

/* ----- What we want -----

# price         => string
# location      => string
# title         => string
# distance      => Number or Decimal128
# detailsFull   => string
# mileage       => string
# external_id   => string
# vin           => string
# id            => string
# seller_type   => string
# url           => string
# img           => string
# date          => string

*/
