const cron = require("node-cron");
const { runCron } = require("./tempest");

/**
 * @params { String } sec
 * @params { String } min
 * @params { String } hrs
 * @params { String } day
 * @params { String } mon
 * @params { String } dow
 */
const auto = timeStr => {
	const task = cron.schedule(timeStr, () => {
		console.log(`RUNNING THE CRON`);
		// runCron();
	});

	const leCron = () => {
		const start = () => {
			console.log(task);
			task.start();
		};
		const stop = () => {
			task.stop();
		};

		return {
			start,
			stop
		};
	};

	return {
		leCron
	};
};

module.exports = {
	auto
};
