const { getAutoTempestResults } = require("../lib/tempest");
const { cronController } = require("../lib/cron");
const User = require("../models/User");
const UserSession = require("../models/UserSession");
const Vehicle = require("../models/Vehicle");

module.exports = {
	vehicles: {
		getVehicles: async (req, res) => {
			const { params } = req.params;
			const autoTempestResults = await getAutoTempestResults(params);

			if (!autoTempestResults.success) {
				return res.json({
					success: false,
					message: autoTempestResults.message
				});
			}

			return res.json({
				success: true,
				vehicles: autoTempestResults
			});
		},
		setFavorite: (req, res) => {
			const { data } = req.body;
			const { vehicle, token } = data;

			if (!data) {
				return res.send({
					success: false,
					message: "Error adding vehicle to favorites"
				});
			}

			if (!token || !vehicle) {
				return res.send({
					success: false,
					message: "Error adding vehicle to favorites"
				});
			}

			UserSession.findById(token, (err, session) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server error"
					});
				}

				if (!session) {
					return res.send({
						success: false,
						message: "Server error"
					});
				}

				const { userId } = session;
				const newVehicle = new Vehicle(vehicle);

				User.findByIdAndUpdate(
					userId,
					{ $push: { favoriteVehicles: newVehicle } },
					(err, user) => {
						if (err) {
							return res.send({
								success: false,
								message: "Server error"
							});
						}

						return res.send({
							success: true,
							message: "Success",
							payload: newVehicle
						});
					}
				);
			});
		},
		removeFavorite: (req, res) => {
			const { vehicle, token } = req.body;

			if (!token || !vehicle) {
				return res.send({
					success: false,
					message: "Error removing vehicle from favorites"
				});
			}

			UserSession.findById(token, (err, session) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server error"
					});
				}

				if (!session) {
					return res.send({
						success: false,
						message: "Server error"
					});
				}

				const { userId } = session;
				const { vin, id, external_id } = vehicle;

				User.findByIdAndUpdate(
					userId,
					{ $pull: { favoriteVehicles: { vin, id, external_id } } },
					(err, user) => {
						if (err) {
							return res.send({
								success: false,
								message: "Server error"
							});
						}

						return res.send({
							success: true,
							message: "Success",
							payload: { vin, id, external_id }
						});
					}
				);
			});
		}
	},
	cron: {
		startCron: async (req, res) => {
			const { time } = req.query;

			if (!time) {
				return res.json({
					success: false,
					message: "Error: No time given"
				});
			}

			// start cron job
			const canRunCron = await cronController()
				.init(time)
				.then(_this => {
					const hasStarted = _this.toggle.start();

					return hasStarted;
				})
				.catch(err => {
					return {
						success: false,
						message: err
					};
				});

			// no go on the cron start
			if (!canRunCron.success) {
				return res.json({
					success: false,
					message: `Error: ${canRunCron.message}`
				});
			}

			return res.json(canRunCron);
		},
		stopCron: (req, res) => {
			const hasStopped = cronController().toggle.stop();

			return res.json(hasStopped);
		}
	},
	userAuth: {
		login: (req, res) => {
			const { password } = req.body;
			let { email } = req.body;

			if (!password && !email) {
				return res.send({
					success: false,
					message: "Please enter your email and password"
				});
			}

			if (!password || password.length < 6) {
				return res.send({
					success: false,
					message: "Please enter your password"
				});
			}

			// Email validation
			if (!email) {
				return res.send({
					success: false,
					message: "Please enter your email"
				});
			}
			email = email.toLowerCase();

			// Check user
			User.find({ email: email }, (err, users) => {
				// Check for error
				if (err) {
					return res.send({
						success: false,
						message: "Server Error"
					});
				}

				if (users.length != 1) {
					return res.send({
						success: false,
						message: "User not found"
					});
				}

				// grab user
				const user = users[0];

				// Verify Password
				if (!user.validPassword(password)) {
					return res.send({
						success: false,
						message: "Invalid password"
					});
				}

				// Create new user session
				const userSession = new UserSession();
				userSession.userId = user._id;

				// Save user session
				userSession.save((err, doc) => {
					if (err) {
						return res.send({
							success: false,
							message: "Error creating session"
						});
					}

					const {
						firstName,
						lastName,
						email,
						favoriteVehicles
					} = user;

					return res.send({
						success: true,
						message: "Valid Login",
						token: doc._id,
						userData: {
							firstName,
							lastName,
							email,
							favoriteVehicles
						}
					});
				});
			});
		},
		logout: (req, res) => {
			// get token
			const { token } = req.query;

			// verify token
			UserSession.findOneAndDelete({ _id: token }, (err, sessions) => {
				if (err) {
					return res.send({
						success: false,
						message: "Error deleting token"
					});
				}
				return res.send({
					success: true,
					message: "Logged Out"
				});
			});
		},
		register: (req, res) => {
			const { firstName, lastName, password, password2 } = req.body;
			let { email } = req.body;
			const emailRegex = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;

			/* Error Checking */
			if (!firstName) {
				return res.send({
					success: false,
					message: "First name cannot be blank."
				});
			}
			if (!lastName) {
				return res.send({
					success: false,
					message: "Last name cannot be blank."
				});
			}
			if (!password || password.length < 6) {
				return res.send({
					success: false,
					message: "Password must be at least 6 characters."
				});
			}

			if (!password2 || password !== password2) {
				return res.send({
					success: false,
					message: "Passwords must match."
				});
			}

			// Email validation
			if (!email) {
				return res.send({
					success: false,
					message: "Email cannot be blank."
				});
			}
			if (!emailRegex.test(email)) {
				return res.send({
					success: false,
					message: "Email is invalid."
				});
			}
			email = email.toLowerCase();

			// Verify email doesn't exist
			User.find({ email: email }, (err, prevUser) => {
				// Check if user exists or there is an error
				if (err) {
					return res.send({
						success: false,
						message: "Server error"
					});
				} else if (prevUser.length > 0) {
					return res.send({
						success: false,
						message: "Account already exists"
					});
				}

				// Create User
				const newUser = new User({
					firstName,
					lastName,
					email
				});

				// hash password and email
				newUser.password = newUser.generatePasswordHash(password);

				// Save User
				newUser.save((err, user) => {
					if (err) {
						return res.send({
							success: false,
							message: "Server error"
						});
					}
					res.send({
						success: true,
						message: "Success"
					});
				});
			});
		},
		verify: (req, res) => {
			// get token
			const { token } = req.query;

			// Verify token
			UserSession.find({ _id: token }, async (err, sessions) => {
				if (err) {
					return res.send({
						success: false,
						message: "Error validating session"
					});
				}

				// Check if token
				if (sessions.length != 1) {
					return res.send({
						success: false,
						message: "Couldn't find token"
					});
				} else {
					const uId = sessions[0].userId;

					User.findById(uId, { _id: 0 })
						.select("firstName lastName email favoriteVehicles")
						.exec((err, user) => {
							if (err) {
								return res.send({
									success: false,
									message: "Server error"
								});
							}

							if (!user) {
								return res.send({
									success: false,
									message: "Server error"
								});
							}

							return res.send({
								success: true,
								message: "Valid Token",
								payload: user
							});
						});
				}
			});
		},
		delete: (req, res) => {
			const { token } = req.query;

			if (!token) {
				return res.send({
					success: false,
					message: "No token given"
				});
			}

			UserSession.findByIdAndDelete(token, (err, session) => {
				if (err) {
					return res.send({
						success: false,
						message: "Server Error"
					});
				}

				User.findByIdAndDelete(session.userId, (err, doc) => {
					if (err) {
						return res.send({
							success: false,
							message: "Error deleting user"
						});
					}

					if (!doc || doc.length === 0) {
						return res.send({
							success: false,
							message: "Invalid token"
						});
					}

					return res.send({
						success: true,
						message: "User Deleted"
					});
				});
			});
		}
	}
};
