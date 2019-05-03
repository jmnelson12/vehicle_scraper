/**
 * @param { Array } array
 */
const flattenArray = array => {
	return array.reduce(
		(prev, next) =>
			Array.isArray(next)
				? prev.concat(flattenArray(next))
				: prev.concat(next),
		[]
	);
};

/**
 * @param { Array } vehicles
 * @param { String } sortParam
 */
const sortVehicles = (vehicles, sortParam) => {
	let sortedVehicles = vehicles;
	let reg = /[,]/g;

	switch (sortParam) {
		case "price_desc": // #########################
			// highest price
			sortedVehicles = vehicles.sort((va, vb) => {
				let priceStrA = va.price;
				let priceStrB = vb.price;
				let priceNumA = priceStrA
					? Number(priceStrA.substr(1).replace(reg, ""))
					: 0;
				let priceNumB = priceStrB
					? Number(priceStrB.substr(1).replace(reg, ""))
					: 0;

				return priceNumB - priceNumA;
			});

			break;
		case "miles_asc": // #########################
			// vehicle miles driven low -> high
			sortedVehicles = vehicles.sort((va, vb) => {
				let mileageStrA = va.mileage;
				let mileageStrB = vb.mileage;
				let mileageNumA = mileageStrA
					? Number(mileageStrA.replace(reg, ""))
					: 0;
				let mileageNumB = mileageStrB
					? Number(mileageStrB.replace(reg, ""))
					: 0;

				return mileageNumA - mileageNumB;
			});

			break;
		case "dist_asc":
			// distance to vehicle low -> high
			sortedVehicles = vehicles.sort((va, vb) => {
				let distA = va.distance ? va.distance : 0;
				let distB = vb.distance ? vb.distance : 0;

				return distA - distB;
			});

			break;
		case "year_desc":
			// vehicle year low -> high
			sortedVehicles = vehicles.sort((va, vb) => {
				let yearStrA = va.year;
				let yearStrB = vb.year;
				let yearNumA = yearStrA ? parseInt(yearStrA, 10) : 0;
				let yearNumB = yearStrB ? parseInt(yearStrB, 10) : 0;

				return yearNumA - yearNumB;
			});

			break;
		default:
			// #########################
			// default to lowest price
			sortedVehicles = vehicles.sort((va, vb) => {
				let priceStrA = va.price;
				let priceStrB = vb.price;
				let priceNumA = priceStrA
					? Number(priceStrA.substr(1).replace(reg, ""))
					: 0;
				let priceNumB = priceStrB
					? Number(priceStrB.substr(1).replace(reg, ""))
					: 0;

				return priceNumA - priceNumB;
			});

			break;
	}

	return sortedVehicles;
};

module.exports = { flattenArray, sortVehicles };
