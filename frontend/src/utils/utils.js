import { getVehicles } from "../utils/api";

const sortArr = async (ctx, sortVal, loadingHandler) => {
	let { make, model, zip, radius } = ctx;

	getVehicles({ sortVal, make, model, zip, radius }).then(res => {
		if (!res.success) {
			ctx.setGlobalError(res.message);
		} else {
			ctx.setGlobalError("");
			ctx.setVehicles(res.vehicles.results);
		}
		loadingHandler(false);
	});
};

export { sortArr };
