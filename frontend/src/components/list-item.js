import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Consumer from "../utils/context";

library.add(faStar);

const ListItem = ({ vehicle }) => {
	const [isFavStarSelected, setIsFavStarSelected] = useState(false);

	const handleFavoriteClick = ctx => {
		// Call to API

		// Change Star Fill
		setIsFavStarSelected(!isFavStarSelected);

		console.log(ctx, vehicle);
	};

	return (
		<>
			<Consumer>
				{ctx => {
					return (
						<li className="list-item">
							<div className="v-image-wrapper">
								<img src={vehicle.img} alt={vehicle.title} />
							</div>
							<div className="v-info-wrapper">
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
								<div className="v-title-wrapper">
									<a
										href={vehicle.url || "#"}
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
										<p>{vehicle.mileage}</p>
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
