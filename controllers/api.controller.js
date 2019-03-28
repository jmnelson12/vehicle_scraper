const { getAutoTempestResults } = require("../lib/tempest");
const { cronController } = require("../lib/cron");
const util = require("util");

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
				_this.toggle.start();

				return {
					success: true,
					task: _this.task
				};
			})
			.catch(err => {
				return {
					success: false,
					message: err
				};
			});

		if (!canRunCron.success) {
			return res.json({
				success: false,
				message: `Error: ${canRunCron.message}`
			});
		}

		return res.json({
			success: true,
			task: util.inspect(canRunCron.task)
		});
	},
	stopCron: (req, res) => {
		const { task } = req.query;

		if (!task) {
			return res.json({
				success: false,
				message: "Error: No task given"
			});
		}

		const _task = JSON.parse(task);
		console.log(_task);
		//const hasStopped = cronController().toggle.stop(_task);

		return res.json(hasStopped);
	}
};
