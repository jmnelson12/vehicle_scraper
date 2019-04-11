import React from "react";

const Error = ({ messageData }) => {
	return (
		<div
			className={messageData.type === "error" ? "error-msg" : "norm-msg"}>
			<p>{messageData.message}</p>
		</div>
	);
};

export default Error;
