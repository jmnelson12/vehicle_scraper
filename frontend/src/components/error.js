import React from "react";

const Error = ({ message }) => {
	return (
		<div className="error-msg">
			<p>{message}</p>
		</div>
	);
};

export default Error;
