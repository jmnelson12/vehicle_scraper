import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";

import "../styles/dashboard.css";

const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));
const VehicleSearch = React.lazy(() => import("./vehicle-search"));
const ListItem = React.lazy(() => import("./list-item"));

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setIsLoading(false);
	}, []);

	const handleErrorMessage = msg => {
		setErrorMessage(msg);
	};

	const handleLoading = bool => {
		setIsLoading(bool);
	};

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Consumer>
					{ctx => {
						return (
							<div className="dash">
								<VehicleSearch
									errorHandler={handleErrorMessage}
									loadingHandler={handleLoading}
								/>
								{errorMessage.length > 0 ||
									(ctx.globalError.length > 0 && (
										<Error
											messageData={{
												type: "error",
												message:
													errorMessage.length > 0
														? errorMessage
														: ctx.globalError
											}}
										/>
									))}
								<div className="total-results-wrapper">
									<p>
										Total Results: {ctx.vehicleData.length}
									</p>
								</div>
								<ul className="vehicle-list">
									{ctx.vehicleData.map((vehicle, key) => {
										const {
											vin: v_vin,
											id: v_id,
											external_id: v_eId
										} = vehicle;
										const favVehicles =
											ctx.userData.favoriteVehicles;
										const hiddenVehicles =
											ctx.userData.hiddenVehicles;
										let isFav = false;
										let isHidden = false;

										if (favVehicles) {
											favVehicles.forEach(entry => {
												const {
													vin: e_vin,
													id: e_id,
													external_id: e_eId
												} = entry;

												if (
													e_vin === v_vin &&
													e_id === v_id &&
													e_eId === v_eId
												) {
													isFav = true;
												}
											});
										}

										if (hiddenVehicles) {
											hiddenVehicles.forEach(entry => {
												const {
													vin: e_vin,
													id: e_id,
													external_id: e_eId
												} = entry;

												if (
													e_vin === v_vin &&
													e_id === v_id &&
													e_eId === v_eId
												) {
													isHidden = true;
												}
											});
										}

										if (isHidden) return false;

										return (
											<ListItem
												key={key}
												vehicle={vehicle}
												favInfo={{
													isShowing: true,
													isFav
												}}
												hiddenInfo={{
													isShowing: true,
													isHidden: false
												}}
											/>
										);
									})}
								</ul>
							</div>
						);
					}}
				</Consumer>
			)}
		</>
	);
};

export default Dashboard;
