const axios = require("axios");
const { flattenArray } = require("./utils");
const Vehicle = require("../models/Vehicle");

/**
 * @param { String } bodystyle
 * @param { Boolean } domesticonly
 * @param { Array[String] } keywords
 * @param { string } make
 * @param { string } make_kw
 * @param { Number } maxmiles
 * @param { Number } maxprice
 * @param { Number } maxyear
 * @param { Number } minmiles
 * @param { Number } minprice
 * @param { Number } minradius
 * @param { Number } minyear
 * @param { String } model
 * @param { String } model_kw
 * @param { Number } originalradius
 * @param { Number } page
 * @param { Number } radius
 * @param { ? } saleby
 * @param { Boolean } showUnpaid
 * @param { String } sites
 * @param { ? } simplified
 * @param { String } sort
 * @param { String } transmission
 * @param { String } zip
 */
const callToAutoTempest = async function(params) {
	const base_url =
		"https://www.autotempest.com/queue-results?make=ram&model=promaster3500&radius=-1&originalradius=-1&saleby=any&simplified=0&transmission=any&zip=27514&sort=price_asc&sites=";
	const sites = ["ot", "cs", "cm", "ebb|eba", "te"];
	let promises = [];

	try {
		// Make GET request and push it to promises array
		sites.forEach(site => {
			promises.push(axios.get(base_url + site));
		});

		let results = await Promise.all(promises);
		return {
			success: true,
			results
		};
	} catch (e) {
		return {
			success: false,
			message: `Results could not be found`
		};
	}
};

/**
 * @param { String } bodystyle
 * @param { Boolean } domesticonly
 * @param { Array[String] } keywords
 * @param { string } make
 * @param { string } make_kw
 * @param { Number } maxmiles
 * @param { Number } maxprice
 * @param { Number } maxyear
 * @param { Number } minmiles
 * @param { Number } minprice
 * @param { Number } minradius
 * @param { Number } minyear
 * @param { String } model
 * @param { String } model_kw
 * @param { Number } originalradius
 * @param { Number } page
 * @param { Number } radius
 * @param { ? } saleby
 * @param { Boolean } showUnpaid
 * @param { String } sites
 * @param { ? } simplified
 * @param { String } sort
 * @param { String } transmission
 * @param { String } zip
 */
const getAutoTempestResults = async function(params) {
	let autoTempestData = await callToAutoTempest(params);
	let errors = [];

	if (!autoTempestData.success) {
		return {
			success: false,
			message: autoTempestData.message
		};
	}

	// We only want the results array from each
	const results = autoTempestData.results.map(({ data }) => {
		if (data.errors.length !== 0) {
			// catch any errors that may have returned
			errors.push(data.errors);
		}
		return data.results;
	});

	return {
		success: true,
		errors: flattenArray(errors),
		results: flattenArray(results)
	};
};

const runCron = async function(params, _this) {
	// TODO: Figure out how i want to proceed with this

	//const autoTempestResults = await getAutoTempestResults(null);

	if (!autoTempestResults.success) {
		_this.toggle.stop();
	}
	// do stuff here
	//console.log(autoTempestResults);
};

module.exports = {
	getAutoTempestResults,
	runCron
};
