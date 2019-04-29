import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";

import "../styles/dashboard.css";
const ListItem = React.lazy(() => import("./list-item"));
const Loading = React.lazy(() => import("./loading"));

const Favorites = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFavorites = async () => {
			setIsLoading(false);
		};
		fetchFavorites();
	});

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<Consumer>
					{ctx => (
						<div className="favs">
							Favorite Vehicles
							<hr />
							<div className="total-results-wrapper">
								<ul className="vehicle-list">
									{ctx.userData.favoriteVehicles.map(
										(vehicle, key) => {
											return (
												<ListItem
													key={key}
													vehicle={vehicle}
													favInfo={{
														isShowing: true,
														isFav: true
													}}
													hiddenInfo={{
														isShowing: false,
														isHidden: false
													}}
												/>
											);
										}
									)}
								</ul>
							</div>
						</div>
					)}
				</Consumer>
			)}
		</>
	);
};

export default Favorites;
