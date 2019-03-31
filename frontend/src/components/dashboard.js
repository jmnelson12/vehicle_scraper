import React, { useState, useEffect } from "react";
import { getVehicles } from "../utils/api";

import "../styles/dashboard.css";

const ListItem = React.lazy(() => import("./list-item"));
const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));

const Dashboard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	// MAKE THIS GLOBAL CONTEXT ?? https://reactjs.org/docs/context.html
	const [vehicleData, setVehicleData] = useState({});

	useEffect(() => {
		const fetchVehicles = async () => {
			setIsLoading(true);

			const result = await getVehicles();

			if (!result.success) {
				setErrorMessage(result.message);
			} else {
				setVehicleData(result.vehicles);
			}
			setIsLoading(false);
		};
		fetchVehicles();
	}, []);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className="dash">
					{errorMessage.length > 0 && (
						<Error message={errorMessage} />
					)}
					Le Dashboard - Code can be found at{" "}
					<a
						href="https://github.com/jmnelson12/vehicle_scraper"
						target="_blank"
						rel="noopener noreferrer">
						https://github.com/jmnelson12/vehicle_scraper
					</a>
					<hr />
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
