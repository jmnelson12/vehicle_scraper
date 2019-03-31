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
const cronController = () => {
	const _this = this;

	const init = timeStr => {
		return new Promise((resolve, reject) => {
			const validTime = cron.validate(timeStr);

			// validate time
			if (!validTime) {
				reject("Time given is not valid");
			}

			// try scheduling the task and catch any errors
			try {
				_this.task = cron.schedule(timeStr, () => {
					console.log(`RUNNING CRON JOB`);
					runCron(null,_this);
				});

				// send _this
				resolve(_this);
			} catch (e) {
				// error occured
				console.error(e);
				reject("Server Error");
			}
		});
	};

	// togle start and stopping of cron job
	this.toggle = {
		start: () => {
			console.log(`STARTING CRON JOB`);

			try {
				_this.task.start();

				return {
					success: true,
					message: "Successfully started cron job"
				};
			} catch (e) {
				console.error(e);
				return {
					success: false,
					message: "Couldn't start cron job"
				};
			}
		},
		stop: _task => {
			console.log(`STOPPING CRON JOB`);

			try {
				_this.task.stop();

				return {
					succes: true,
					message: "Cron jobs successfully stopped"
				};
			} catch (e) {
				console.log(e);

				return {
					success: false,
					message: "Error: Couldn't stop cron job"
				};
			}
		}
	};

	return {
		init,
		toggle: this.toggle
	};
};

module.exports = {
	cronController
};
