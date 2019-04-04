import React, { useState } from "react";
import { Link } from "react-router-dom";
import Consumer from "../utils/context";
import "../styles/navbar.css";

const Navbar = () => {
	const [dropdownShowing, setDropdownShowing] = useState(false);

	const handleDropdownClick = () => {
		setDropdownShowing(!dropdownShowing);
	};

	return (
		<Consumer>
			{ctx => {
				console.log(ctx);
				return (
					<nav>
						<div className="logo-wrapper">
							<Link to="/">Vehicle Scraper</Link>
						</div>
						<div className="nav-user-wrapper">
							<button className="btnAuth">Login</button>
							<button className="btnAuth">Sign Up</button>

							<div
								className="dropdown-menu"
								onClick={handleDropdownClick}>
								<button className="dropdown-toggle">
									user goes here
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
									<button className="dropdown-item">
										Logout
									</button>
								</div>
							</div>
						</div>
					</nav>
				);
			}}
		</Consumer>
	);
};

export default Navbar;
