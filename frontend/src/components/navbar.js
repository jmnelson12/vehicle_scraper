import React from "react";
import "../styles/navbar.css";
import Consumer from "../utils/context";

const Navbar = () => {
	return (
		<Consumer>
			{ctx => {
				console.log(ctx);
				return (
					<nav>
						<div className="logo-wrapper">
							<a href="/">Vehicle Search</a>
						</div>
						<div className="nav-user-wrapper">
							<a href="/">Login</a>
							<a href="/">Sign Up</a>

							<div className="dropdown-menu">
								<a href="/" className="dropdown-item">
									Favorites
								</a>
							</div>
						</div>
					</nav>
				);
			}}
		</Consumer>
	);
};

export default Navbar;
