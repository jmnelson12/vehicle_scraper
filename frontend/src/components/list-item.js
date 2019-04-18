import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Consumer from "../utils/context";
import { setFavorite, removeFavorite, setNotInterested } from "../utils/api";
import { getFromStorage, storage_key } from "../utils/storage";

library.add(faStar);

const ListItem = ({ vehicle, isFav }) => {
	const [isFavStarSelected, setIsFavStarSelected] = useState(isFav);

	const handleFavoriteClick = ctx => {
		const { token } = getFromStorage(storage_key);

		if (!isFavStarSelected) {
			// Set Favorite
			// Call to API
			setFavorite({ vehicle, token }).then(res => {
				if (res.success) {
					// Change Star Fill
					setIsFavStarSelected(!isFavStarSelected);

					// update context
					let newData = ctx.userData;
					newData.favoriteVehicles = [
						res.payload,
						...newData.favoriteVehicles
					];

					ctx.setUserData(newData);
				}
			});
		} else {
			// remove favorite
			removeFavorite({ vehicle, token }).then(res => {
				if (res.success) {
					//Change Star Fill
					setIsFavStarSelected(!isFavStarSelected);
					// update context
					let newData = ctx.userData;
					newData.favoriteVehicles = newData.favoriteVehicles.filter(
						obj => {
							const { vin, id, external_id } = obj;
							const {
								vin: r_vin,
								id: r_id,
								external_id: r_eId
							} = res.payload;
							return (
								vin !== r_vin &&
								id !== r_id &&
								external_id !== r_eId
							);
						}
					);

					ctx.setUserData(newData);
				}
			});
		}
	};

	const handleNotInterestedClick = (e, ctx) => {
		const { token } = getFromStorage(storage_key);
		console.log(e.target);

		// setNotInterested({ vehicle, token }).then(res => {
		// 	if (res.success) {
		// 		// update context
		// 		let newData = ctx.userData;
		// 		newData.hiddenVehicles = [
		// 			res.payload,
		// 			...newData.hiddenVehicles
		// 		];

		// 		ctx.setUserData(newData);
		// 	}
		// });
	};

	return (
		<>
			<Consumer>
				{ctx => {
					const { price, mileage, year, distance } = vehicle;
					return (
						<li
							className="list-item"
							data-price={price}
							data-mileage={mileage}
							data-year={year}
							data-distance={distance}>
							<div className="v-image-wrapper">
								<img src={vehicle.img} alt={vehicle.title} />
							</div>
							<div className="v-info-wrapper">
								{ctx.userLoggedIn && (
									<>
										<div
											className="v-interested-wrapper"
											onClick={e => {
												handleNotInterestedClick(
													e,
													ctx
												);
											}}>
											<h3>Hide Vehicle</h3>
										</div>
										<div className="v-star-wrapper">
											<FontAwesomeIcon
												icon={faStar}
												onClick={() => {
													handleFavoriteClick(ctx);
												}}
												className={
													isFavStarSelected
														? "solid"
														: "outline"
												}
											/>
										</div>
									</>
								)}
								<div className="v-title-wrapper">
									<a
										href={
											vehicle.url.indexOf("http") === -1
												? "#"
												: vehicle.url
										}
										target="_blank"
										rel="noopener noreferrer">
										<h2>{vehicle.title}</h2>
									</a>
								</div>
								<div className="v-price-wrapper">
									<h2>{vehicle.price}</h2>
								</div>
								<div className="v-inner-info-wrapper">
									<div className="v-mileage">
										<p>{vehicle.mileage} miles</p>
									</div>
									<div className="v-posted">
										<p>{vehicle.date}</p>
									</div>
									<div className="v-location">
										<p>
											{vehicle.location} -{" "}
											{vehicle.distance} miles away
										</p>
									</div>
								</div>
							</div>
						</li>
					);
				}}
			</Consumer>
		</>
	);
};

export default ListItem;

/* ----- What we want -----

# price         => string
# location      => string
# title         => string
# distance      => Number or Decimal128
# detailsFull   => string
# mileage       => string
# external_id   => string
# vin           => string
# id            => string
# seller_type   => string
# url           => string
# img           => string
# date          => string

*/
