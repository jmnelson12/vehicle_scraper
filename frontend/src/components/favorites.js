import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";
import "../styles/favorites.css";
const ListItem = React.lazy(() => import("./list-item"));
const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));

const Favorites = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [favoriteData, setFavoriteData] = useState({});

	useEffect(() => {
		const fetchFavorites = async () => {
			setIsLoading(false);
		};
		fetchFavorites();
	});

	return (
		<>
			{isLoading ? <Loading /> : <div className="favs">Le Favorites</div>}
		</>
	);
};

export default Favorites;
