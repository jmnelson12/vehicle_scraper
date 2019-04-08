import axios from "axios";

// Vehicle Section
const getVehicles = async params => {
	// TODO: implement params
	try {
		const { data } = await axios.get("/getVehicles");

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
	// vin is the vin number of the vehicle
	// eID is the external id of the vehicle
	// id is the id given to the vehicle obj from the external api

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
	login,
	logout,
	register,
	verify,
	deleteUser
};
