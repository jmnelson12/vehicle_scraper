import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { register } from "../utils/api";

import "../styles/userAuth.css";

const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));

library.add([faEnvelope, faLock, faUser]);

const SignUp = ({ handleCancel }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState({ type: "norm", message: "" });

	useEffect(() => {
		setIsLoading(false);
	});

	// State Changes
	const handleFirstNameChange = e => {
		setFirstName(e.target.value);
	};
	const handleLastNameChange = e => {
		setLastName(e.target.value);
	};
	const handleEmailChange = e => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = e => {
		setPassword(e.target.value);
	};
	const handlePassword2Change = e => {
		setPassword2(e.target.value);
	};

	// Methods
	const handleSignUp = () => {
		setIsLoading(true);

		register({ firstName, lastName, email, password, password2 }).then(
			res => {
				setMessage({
					type: res.success ? "norm" : "error",
					message: res.message
				});
				setIsLoading(false);
			}
		);
	};

	return (
		<div className="user-modal signup-modal">
			{isLoading ? (
				<Loading />
			) : (
				<>
					{message.message.length !== 0 && (
						<Error messageData={message} />
					)}
					<div className="user-title-wrapper">
						<h1>Sign Up</h1>
					</div>
					<form onSubmit={handleSignUp}>
						<div className="user-input-wrapper">
							<div className="input-group">
								<label htmlFor="txt-firstName">
									<FontAwesomeIcon icon={faUser} />
								</label>
								<input
									type="email"
									id="txt-email"
									className="txt-firstName"
									value={firstName}
									onChange={handleFirstNameChange}
									placeholder="First Name"
									autoFocus={true}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="txt-lastName">
									<FontAwesomeIcon icon={faUser} />
								</label>
								<input
									type="email"
									id="txt-lastName"
									className="txt-lastName"
									value={lastName}
									onChange={handleLastNameChange}
									placeholder="Last Name"
								/>
							</div>

							<div className="input-group">
								<label htmlFor="txt-email">
									<FontAwesomeIcon icon={faEnvelope} />
								</label>
								<input
									type="email"
									id="txt-email"
									className="txt-auth"
									value={email}
									onChange={handleEmailChange}
									placeholder="Email"
								/>
							</div>

							<div className="input-group">
								<label htmlFor="txt-password">
									<FontAwesomeIcon icon={faLock} />
								</label>
								<input
									type="password"
									id="txt-password"
									className="txt-auth"
									value={password}
									onChange={handlePasswordChange}
									placeholder={"Password"}
								/>
							</div>

							<div className="input-group">
								<label htmlFor="txt-password2">
									<FontAwesomeIcon icon={faLock} />
								</label>
								<input
									type="password"
									id="txt-password2"
									className="txt-auth"
									value={password2}
									onChange={handlePassword2Change}
									placeholder={"Confirm Password"}
								/>
							</div>

							<div className="btn-group-wrapper">
								<div className="btn-group">
									<input
										type="submit"
										className="signup"
										onClick={handleSignUp}
										value={"Sign Up"}
									/>
								</div>
								<div className="btn-group">
									<button
										className="cancel"
										onClick={handleCancel}>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</form>
				</>
			)}
		</div>
	);
};

export default SignUp;
