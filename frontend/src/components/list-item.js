import React from "react";
// const Loading = React.lazy(() => import("./loading"));

const ListItem = ({ vehicle }) => {
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	setIsLoading(false);
	// }, []);

	return (
		<>
			<li>
				<div className="v-image-wrapper">
					<img src={vehicle.img} alt={vehicle.title} />
				</div>
				<div className="v-info-wrapper">
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
								{vehicle.location} - {vehicle.distance} miles
								away
							</p>
						</div>
					</div>
				</div>
			</li>
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
