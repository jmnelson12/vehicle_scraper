import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles/App.css";

const App = () => {
	useEffect(() => {
		const fetchVehicles = async () => {
			const test = await axios.get("/getVehicles");
			console.log(test);
		};
		fetchVehicles();
	});

	return (
		<div className="App">
			<h1>App</h1>
		</div>
	);
};

export default App;
