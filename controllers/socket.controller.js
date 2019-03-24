exports.sockets = function(socket) {
	console.log(socket);
	const sendVehicles = () => {
		socket.emit("vehicles", "oi");
	};

	return {
		sendVehicles
	};
};

// module.exports = {
// 	sendVehicles(socket) {
// 		socket.broadcast.emit("vehicles", "oi");
// 	}
// };
