import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Consumer from "../utils/context";
import {
	setFavorite,
	removeFavorite,
	setNotInterested,
	removeNotInterested
} from "../utils/api";
import { getFromStorage, storage_key } from "../utils/storage";

library.add(faStar);

// favInfo => { isShowing: bool, isFav: bool}
// hiddenInfo => { isShowing: bool, isHidden: bool}
const ListItem = ({ vehicle, favInfo, hiddenInfo }) => {
	const [isFavStarSelected, setIsFavStarSelected] = useState(favInfo.isFav);
	const [isHiddenSelected, setIsHiddenSelected] = useState(
		hiddenInfo.isHidden
	);
	const [isElShowing, setIsElShowing] = useState(true);

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

	const handleNotInterestedClick = ctx => {
		const { token } = getFromStorage(storage_key);

		setNotInterested({ vehicle, token }).then(res => {
			if (res.success) {
				setIsHiddenSelected(!isHiddenSelected);

				// update context
				let newData = ctx.userData;
				newData.hiddenVehicles = [
					res.payload,
					...newData.hiddenVehicles
				];

				ctx.setUserData(newData);
				setIsElShowing(false);
			}
		});
	};

	const handleShowAgain = ctx => {
		const { token } = getFromStorage(storage_key);

		removeNotInterested({ vehicle, token }).then(res => {
			if (res.success) {
				setIsHiddenSelected(!setIsHiddenSelected);

				// update context
				let newData = ctx.userData;
				newData.hiddenVehicles = newData.hiddenVehicles.filter(obj => {
					const { vin, id, external_id } = obj;
					const {
						vin: r_vin,
						id: r_id,
						external_id: r_eId
					} = res.payload;
					return (
						vin !== r_vin && id !== r_id && external_id !== r_eId
					);
				});

				ctx.setUserData(newData);
				setIsElShowing(false);
			}
		});
	};

	return (
		<>
			<Consumer>
				{ctx => {
					const { price, mileage, year, distance } = vehicle;
					return (
						<li
							style={{ display: isElShowing ? "flex" : "none" }}
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
										{hiddenInfo.isShowing && (
											<div
												className="v-interested-wrapper"
												onClick={e => {
													if (isHiddenSelected) {
														handleShowAgain(ctx);
													} else {
														handleNotInterestedClick(
															ctx
														);
													}
												}}>
												<h3>
													{isHiddenSelected
														? "Show"
														: "Hide"}{" "}
													Vehicle
												</h3>
											</div>
										)}
										{favInfo.isShowing && (
											<div className="v-star-wrapper">
												<FontAwesomeIcon
													icon={faStar}
													onClick={() => {
														handleFavoriteClick(
															ctx
														);
													}}
													className={
														isFavStarSelected
															? "solid"
															: "outline"
													}
												/>
											</div>
										)}
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
										<p>
											{vehicle.mileage
												? vehicle.mileage + " miles"
												: "No Mileage Listed"}
										</p>
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
