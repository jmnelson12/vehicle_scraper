import React from "react";
import { Link } from "react-router-dom";
import Consumer from "../utils/context";
import "../styles/navbar.css";

const Navbar = () => {
	return (
		<Consumer>
			{ctx => {
				console.log(ctx);
				return (
					<nav>
						<div className="logo-wrapper">
							<Link to="/">Home</Link>
						</div>
						<div className="nav-user-wrapper">
							<button className="btnAuth">Login</button>
							<button className="btnAuth">Sign Up</button>

							<div className="dropdown-menu">
								<Link to="/favorites" className="dropdown-item">
									Favorites
								</Link>
								<button className="dropdown-item">
									Logout
								</button>
							</div>
						</div>
					</nav>
				);
			}}
		</Consumer>
	);
};

export default Navbar;
