import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/api";
import {
	getFromStorage,
	removeFromStorage,
	storage_key
} from "../utils/storage";
import Consumer from "../utils/context";

import "../styles/navbar.css";

const Error = React.lazy(() => import("./error"));

const Navbar = ({ handleUserClick }) => {
	const [dropdownShowing, setDropdownShowing] = useState(false);
	const [message, setMessage] = useState({ type: "norm", message: "" });

	const handleDropdownClick = () => {
		setDropdownShowing(!dropdownShowing);
	};

	const handleLogout = ctx => {
		/* eslint-disable */
		var c = confirm("Are you sure you want to log out?");
		/* eslint-enable */
		if (c) {
			const { token } = getFromStorage(storage_key);

			if (!token) {
				// error message
			} else {
				logout(token).then(res => {
					if (!res.success) {
						setMessage({
							type: "error",
							message: res.message
						});
					} else {
						removeFromStorage(storage_key);
						ctx.setUserLoggedIn(false);
						ctx.setUserData({});
					}
				});
			}
		}
	};

	return (
		<Consumer>
			{ctx => {
				const { firstName, lastName } = ctx.userData;

				return (
					<nav>
						<div className="logo-wrapper">
							<Link to="/">Vehicle Scraper</Link>
						</div>
						{message.message.length !== 0 && (
							<div className="error-wrapper">
								<Error messageData={message} />
							</div>
						)}
						<div className="nav-user-wrapper">
							{!ctx.userLoggedIn ? (
								<>
									<button
										className="btnAuth"
										onClick={() => {
											handleUserClick("login");
										}}>
										Login
									</button>
									<button
										className="btnAuth"
										onClick={() => {
											handleUserClick("register");
										}}>
										Sign Up
									</button>
								</>
							) : (
								<div
									className="dropdown-menu"
									onClick={handleDropdownClick}>
									<button className="dropdown-toggle">
										Welcome, {firstName + " " + lastName}
									</button>
									<div
										className={
											"dropdown-list " +
											(dropdownShowing ? "show" : "")
										}>
										<Link
											to="/favorites"
											className="dropdown-item">
											Favorites
										</Link>
										<button
											onClick={() => {
												handleLogout(ctx);
											}}
											className="dropdown-item">
											Logout
										</button>
									</div>
								</div>
							)}
						</div>
					</nav>
				);
			}}
		</Consumer>
	);
};

export default Navbar;
