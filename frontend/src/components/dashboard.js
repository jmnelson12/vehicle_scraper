import React, { useState, useEffect } from "react";
import { getVehicles } from "../utils/api";

import "../styles/dashboard.css";

const ListItem = React.lazy(() => import("./list-item"));
const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [vehicleData, setVehicleData] = useState({});

	useEffect(() => {
		const fetchVehicles = async () => {
			setIsLoading(true);

			const res = await getVehicles();

			if (!res.success) {
				setErrorMessage(res.message);
			} else {
				setVehicleData(res.vehicles);
			}

			setIsLoading(false);
		};
		fetchVehicles();
	}, vehicleData);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="dash">
					{errorMessage.length > 0 && (
						<Error
							messageData={{
								type: "error",
								message: errorMessage
							}}
						/>
					)}
					Le Dashboard - Code can be found at{" "}
					<a
						href="https://github.com/jmnelson12/vehicle_scraper"
						target="_blank"
						rel="noopener noreferrer">
						https://github.com/jmnelson12/vehicle_scraper
					</a>
					<hr />
					<div className="total-results-wrapper">
						<p>Total Results: {vehicleData.results.length}</p>
					</div>
					<ul className="vehicle-list">
						{vehicleData.results.map((vehicle, key) => {
							return <ListItem key={key} vehicle={vehicle} />;
						})}
					</ul>
				</div>
			)}
		</>
	);
};

export default Dashboard;
