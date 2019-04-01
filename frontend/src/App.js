import React, { useState, useEffect } from "react";
import { ConfigProvider } from "./utils/context";
import "./styles/App.css";

const Navbar = React.lazy(() => import("./components/navbar"));
const Dashboard = React.lazy(() => import("./components/dashboard"));
const Loading = React.lazy(() => import("./components/loading"));

const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className="App">
			{isLoading ? (
				<Loading />
			) : (
				<>
					<ConfigProvider
						user={{
							firstName: "Jacob"
						}}>
						<Navbar />
						<Dashboard />
					</ConfigProvider>
				</>
			)}
		</div>
	);
};

export default App;
