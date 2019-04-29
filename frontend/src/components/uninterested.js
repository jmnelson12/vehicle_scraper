import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";

import "../styles/dashboard.css";

const ListItem = React.lazy(() => import("./list-item"));
const Loading = React.lazy(() => import("./loading"));

const HiddenVehicles = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	});

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Consumer>
					{ctx => {
						return (
							<div className="favs">
								Hidden Vehicles
								<hr />
								<div className="total-results-wrapper">
									<ul className="vehicle-list">
										{typeof ctx.userData.hiddenVehicles !==
											"undefined" &&
											ctx.userData.hiddenVehicles.map(
												(vehicle, key) => {
													return (
														<ListItem
															key={key}
															vehicle={vehicle}
															favInfo={{
																isShowing: false,
																isFav: false
															}}
															hiddenInfo={{
																isShowing: true,
																isHidden: true
															}}
														/>
													);
												}
											)}
									</ul>
								</div>
							</div>
						);
					}}
				</Consumer>
			)}
		</>
	);
};

export default HiddenVehicles;
