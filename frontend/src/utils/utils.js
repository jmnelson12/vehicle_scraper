import { getVehicles } from "../utils/api";

const sortArr = async (ctx, sortVal, loadingHandler) => {
	let { make, model, zip, radius } = ctx;

	getVehicles({ sortVal, make, model, zip, radius }).then(res => {
		// if (!res.success) {
		// 	ctx.setGlobalError(res.message);
		// } else {
		// 	let leVehicles = res.vehicles.results;

		// 	if (leVehicles) {
		// 		// re sort - https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects-by-property (example)
		// 	}
		// 	ctx.setGlobalError("");
		// 	ctx.setVehicles();

		// 	console.log(res.vehicles.results);
		// }
		loadingHandler(false);
	});
};

export { sortArr };
