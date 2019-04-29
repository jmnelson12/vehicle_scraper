import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "./utils/context";
import {
	getFromStorage,
	removeFromStorage,
	storage_key
} from "./utils/storage";
import { verify } from "./utils/api";

import "./styles/App.css";

const Loading = React.lazy(() => import("./components/loading"));
const Navbar = React.lazy(() => import("./components/navbar"));
const ErrorPage = React.lazy(() => import("./components/not-found"));
const Dashboard = React.lazy(() => import("./components/dashboard"));
const Favorites = React.lazy(() => import("./components/favorites"));
const NotInterested = React.lazy(() => import("./components/uninterested"));
const Login = React.lazy(() => import("./components/login"));
const SignUp = React.lazy(() => import("./components/signup"));

const App = () => {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [userData, setUserData] = useState({});
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// look in localstorage for user session token
		const storageData = getFromStorage(storage_key);

		// if token then log in user
		if (storageData && storageData.token) {
			const { token } = storageData;

			verify(token).then(res => {
				if (!res.success) {
					removeFromStorage(storage_key);
					setIsLoading(false);
				} else {
					setUserData(res.payload);
					setUserLoggedIn(true);
					setIsLoading(false);
				}
			});
		} else {
			setIsLoading(false);
		}
	}, []);

	const handleBodyClick = e => {
		// If user dropdown is showing, then hide it
		const userDropdown = document.querySelector(".dropdown-list.show");
		if (userDropdown) {
			userDropdown.classList.remove("show");
		}
	};

	const handleUserAuthNavClick = type => {
		handleCancelClick();

		switch (type) {
			case "login":
				setShowLoginModal(true);
				break;
			case "register":
				setShowSignUpModal(true);
				break;
			default:
				handleCancelClick();
				break;
		}
	};

	const handleCancelClick = () => {
		setShowLoginModal(false);
		setShowSignUpModal(false);
	};

	return (
		<div className="App" onClick={handleBodyClick}>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<ConfigProvider user={userData} loggedIn={userLoggedIn}>
						<Router>
							<Navbar handleUserClick={handleUserAuthNavClick} />
							{showLoginModal && (
								<Login handleCancel={handleCancelClick} />
							)}
							{showSignUpModal && (
								<SignUp handleCancel={handleCancelClick} />
							)}
							<Switch>
								<Route exact path="/" component={Dashboard} />
								<Route
									path="/favorites"
									component={Favorites}
								/>
								<Route
									path="/hidden"
									component={NotInterested}
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
