const { getAutoTempestResults } = require("../lib/tempest");
const { cronController } = require("../lib/cron");

module.exports = {
	getVehicles: async (req, res) => {
		const { params } = req.params;
		const autoTempestResults = await getAutoTempestResults(params);
		console.log("Finished");

		res.json({
			vehicles: autoTempestResults
		});
	},
	startCronJob: (req, res) => {
		// get time string from client

		const cronJob = cronController("*/10 * * * * *");
		cronJob.toggle.start();

		return res.json("success");
	},
	stopCronJob: (req, res) => {}
};
