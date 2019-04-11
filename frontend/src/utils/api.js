import axios from "axios";

// Vehicle Section
const getVehicles = async params => {
	// params so far are make, model, zip, radius
	const { make, model, zip, radius } = params;
	const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

	if (make === "") {
		return {
			success: false,
			message: "Please select the make of the vehicle"
		};
	}
	if (model === "") {
		return {
			success: false,
			message: "Please select the model of the vehicle"
		};
	}
	if (zip === "") {
		return {
			success: false,
			message: "Please enter your zip code"
		};
	}
	if (!zipRegex.test(zip)) {
		return {
			success: false,
			message: "Invalid Zip Code"
		};
	}
	if (radius === "") {
		return {
			success: false,
			message: "Please select a radius"
		};
	}

	try {
		const { data } = await axios.get("/getVehicles", {
			params: { make, model, zip, radius }
		});

		if (!data.success) {
			return {
				success: false,
				message: data.message
			};
		}
		return {
			success: true,
			vehicles: data.vehicles
		};
	} catch (e) {
		return {
			success: false,
			message: "Error calling getVehicles endpoint"
		};
	}
};
const setFavorite = async ({ vehicle, token }) => {
	if (!vehicle && !token) {
		return {
			success: false,
			message: "Vehilce not found"
		};
	}

	try {
		const response = await axios.post("/setFavorite", {
			data: { vehicle, token }
		});

		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling setFavorite endpoint"
		};
	}
};
const removeFavorite = async ({ vehicle, token }) => {
	if (!vehicle && !token) {
		return {
			success: false,
			message: "Vehilce not found"
		};
	}

	try {
		const response = await axios.delete("/removeFavorite", {
			data: { vehicle, token }
		});

		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling removeFavorite endpoint"
		};
	}
};
const getMakes = async () => {
	try {
		const response = await axios.get("/getMakes");
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling getMakes endpoint"
		};
	}
};
const getModels = async make => {
	if (!make) {
		return {
			success: false,
			message: "Models not found"
		};
	}

	try {
		const response = await axios.get("/getModels", { params: { make } });
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling getModels endpoint"
		};
	}
};

// User Auth Section
const login = async ({ email, password }) => {
	if (!email && !password) {
		return {
			success: false,
			message: "Please fill in your email and password"
		};
	}

	if (!email) {
		return {
			success: false,
			message: "Please enter your email"
		};
	}

	if (!password) {
		return {
			success: false,
			message: "Please enter your password"
		};
	}

	try {
		const response = await axios.post("/login", {
			email,
			password
		});
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling login endpoint"
		};
	}
};
const logout = async token => {
	if (!token) {
		return {
			success: false,
			message: "Error logging out user"
		};
	}

	try {
		const response = await axios.get("/logout?token=" + token);
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling logout endpoint"
		};
	}
};
const register = async userData => {
	const { firstName, lastName, email, password, password2 } = userData;

	if (!email && !password && !firstName && !lastName) {
		return {
			success: false,
			message: "Please enter your information in the fields below"
		};
	}

	if (!email) {
		return {
			success: false,
			message: "Please enter your email"
		};
	}

	if (!password) {
		return {
			success: false,
			message: "Please enter your password"
		};
	}

	if (!password2 || password !== password2) {
		return {
			success: false,
			message: "Passwords must match"
		};
	}

	if (!firstName) {
		return {
			success: false,
			message: "Please enter your first name"
		};
	}

	if (!lastName) {
		return {
			success: false,
			message: "Please enter your last name"
		};
	}

	try {
		const response = await axios.post("/register", userData);
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling register endpoint"
		};
	}
};
const verify = async token => {
	if (!token) {
		return {
			success: false,
			message: "Erro verifying user"
		};
	}

	try {
		const response = await axios.get("/verify?token=" + token);
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling verify endpoint"
		};
	}
};
const deleteUser = async token => {
	if (!token) {
		return {
			success: false,
			message: "Error deleting user"
		};
	}

	try {
		const response = await axios.delete("/deleteUser?token=" + token);
		return response.data;
	} catch (e) {
		return {
			success: false,
			message: "Error calling deleteUser endpoint"
		};
	}
};

// Export
export {
	getVehicles,
	setFavorite,
	removeFavorite,
	getMakes,
	getModels,
	login,
	logout,
	register,
	verify,
	deleteUser
};
