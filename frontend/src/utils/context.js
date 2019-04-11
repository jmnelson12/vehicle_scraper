// idea of putting context in file comes from --> https://stackoverflow.com/a/50953998
import React, { createContext, useState } from "react";

const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children, user, loggedIn, vehicles }) => {
	const [userLoggedIn, setUserLoggedIn] = useState(loggedIn);
	const [userData, setUserData] = useState(user);
	const [vehicleData, setVehicles] = useState(vehicles);

	return (
		<Provider
			value={{
				userLoggedIn,
				setUserLoggedIn,
				userData,
				setUserData,
				vehicleData,
				setVehicles
			}}>
			{children}
		</Provider>
	);
};

export { ConfigProvider };

// making this default because it will be used most
export default Consumer;
