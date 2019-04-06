import React, { useState, useEffect } from "react";

const Error = ({ messageData }) => {
	const [isShowing, setIsShowing] = useState(true);

	useEffect(() => {
		const hideMessage = () => {
			setTimeout(() => {
				setIsShowing(false);
			}, 3000);
		};
		hideMessage();
	});

	return (
		<>
			{isShowing ? (
				<div
					className={
						messageData.type === "error" ? "error-msg" : "norm-msg"
					}>
					<p>{messageData.message}</p>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default Error;
