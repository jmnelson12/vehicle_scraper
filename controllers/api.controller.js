const { getAutoTempestResults } = require("../lib/tempest");
const { cronController } = require("../lib/cron");

module.exports = {
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
		res.json("Fav Set");
	},
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
};
