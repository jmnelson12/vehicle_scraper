const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		default: "",
		required: true
	},
	lastName: {
		type: String,
		default: "",
		required: true
	},
	email: {
		type: String,
		default: "",
		lowercase: true,
		required: true
	},
	password: {
		type: String,
		default: "",
		required: true
	},
	favoriteVehicles: {
		type: Array,
		default: []
	}
});

UserSchema.methods.generatePasswordHash = function(string) {
	return bcrypt.hashSync(string, bcrypt.genSaltSync(10), null);
};

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
