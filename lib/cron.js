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
const cronController = timeStr => {
	const task = cron.schedule(timeStr, () => {
		console.log(`RUNNING THE CRON JOB`);
		runCron();
	});

	const toggle = {
		start: () => {
			console.log(`STARTING THE CRON JOB`);
			task.start();
		},
		stop: () => {
			console.log(`STOPPING THE CRON JOB`);
			task.stop();
		}
	};

	return {
		toggle
	};
};

module.exports = {
	cronController
};
