import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "./utils/context";
import "./styles/App.css";

const Loading = React.lazy(() => import("./components/loading"));
const Navbar = React.lazy(() => import("./components/navbar"));
const ErrorPage = React.lazy(() => import("./components/not-found"));
const Dashboard = React.lazy(() => import("./components/dashboard"));
const Favorites = React.lazy(() => import("./components/favorites"));

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
						<Router>
							<Navbar />
							<Switch>
								<Route exact path="/" component={Dashboard} />
								<Route
									path="/favorites"
									component={Favorites}
								/>
								<Route component={ErrorPage} />
							</Switch>
						</Router>
					</ConfigProvider>
				</>
			)}
		</div>
	);
};

export default App;
