const { getAutoTempestResults } = require("../lib/tempest");

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
	}
};
