import React, { useState, useEffect } from "react";
import "./styles/App.css";

const Dashboard = React.lazy(() => import("./components/dashboard"));
const Loading = React.lazy(() => import("./components/loading"));

const App = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return <div className="App">{isLoading ? <Loading /> : <Dashboard />}</div>;
};

export default App;
