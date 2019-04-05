import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { login } from "../utils/api";
import { setInStorage, storage_key } from "../utils/storage";
import Consumer from "../utils/context";

import "../styles/userAuth.css";

const Loading = React.lazy(() => import("./loading"));
const Error = React.lazy(() => import("./error"));

library.add([faEnvelope, faLock]);

const Login = ({ handleCancel }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [message, setMessage] = useState({ type: "norm", message: "" });

	useEffect(() => {
		setIsLoading(false);
	});

	const handleEmailChange = e => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = e => {
		setPassword(e.target.value);
	};
	const handleLogin = ctx => {
		setIsLoading(true);
		login({ email, password }).then(res => {
			if (!res.success) {
				setMessage({
					type: "error",
					message: res.message
				});
				setIsLoading(false);
			} else {
				// put token in localstorage
				setInStorage(storage_key, { token: res.token });

				// change nav / update context
				ctx.setUserLoggedIn(true);
				ctx.setUserData(res.userData);

				// close pane
				setTimeout(function() {
					handleCancel();
				});

				setIsLoading(false);
			}
		});
	};

	return (
		<div className="user-modal login-modal">
			{isLoading ? (
				<Loading />
			) : (
				<Consumer>
					{ctx => {
						return (
							<>
								{message.message.length !== 0 && (
									<Error messageData={message} />
								)}
								<div className="user-title-wrapper">
									<h1>Login</h1>
								</div>
								<form
									onSubmit={() => {
										handleLogin(ctx);
									}}>
									<div className="user-input-wrapper">
										<div className="input-group">
											<label htmlFor="txt-email">
												<FontAwesomeIcon
													icon={faEnvelope}
												/>
											</label>
											<input
												type="email"
												id="txt-email"
												className="txt-auth"
												value={email}
												onChange={handleEmailChange}
												placeholder="Enter your email..."
												autoFocus={true}
											/>
										</div>
										<div className="input-group">
											<label htmlFor="txt-password">
												<FontAwesomeIcon
													icon={faLock}
												/>
											</label>
											<input
												type="password"
												id="txt-password"
												className="txt-auth"
												value={password}
												onChange={handlePasswordChange}
												placeholder={
													"Enter your password..."
												}
											/>
										</div>
										<div className="btn-group-wrapper">
											<div className="btn-group">
												<input
													type="submit"
													className="login"
													onClick={() => {
														handleLogin(ctx);
													}}
													value={"Login"}
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
						);
					}}
				</Consumer>
			)}
		</div>
	);
};

export default Login;
