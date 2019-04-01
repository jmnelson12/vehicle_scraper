// idea of this comes from --> https://stackoverflow.com/a/50953998
import React, { createContext } from "react";

const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children, user }) => {
	return (
		<Provider
			value={{
				user
			}}>
			{children}
		</Provider>
	);
};

export { ConfigProvider };

// making this default because it will be used most
export default Consumer;
