// idea of putting context in file comes from --> https://stackoverflow.com/a/50953998
import React, { createContext, useState } from "react";

const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children, user, loggedIn }) => {
	const [userLoggedIn, setUserLoggedIn] = useState(loggedIn);
	const [userData, setUserData] = useState(user);
	const [vehicleData, setVehicles] = useState([]);
	const [sortVal, setSortVal] = useState("price_asc");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [zip, setZip] = useState("");
	const [radius, setRadius] = useState("");
	const [globalError, setGlobalError] = useState("");

	return (
		<Provider
			value={{
				userLoggedIn,
				setUserLoggedIn,
				userData,
				setUserData,
				globalError,
				setGlobalError,
				vehicleData,
				setVehicles,
				sortVal,
				setSortVal,
				make,
				setMake,
				model,
				setModel,
				zip,
				setZip,
				radius,
				setRadius
			}}>
			{children}
		</Provider>
	);
};

export { ConfigProvider };

// making this default because it will be used most
export default Consumer;
