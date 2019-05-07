const express = require("express");
const favicon = require("express-favicon");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sslRedirect = require("heroku-ssl-redirect");

const app = express();

const isDev = process.env.NODE_ENV || "dev";
const port = process.env.PORT || 8080;
const apiRoutes = require("./routes/api");

const db =
	isDev === "dev"
		? require("./config/devURI").MONGO_URI
		: require("./config/prodURI").MONGO_URI;

// -- Middleware and such
// Favicon
app.use(favicon(__dirname + "/frontend/build/favicon.ico"));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

// api usage
app.use("/", apiRoutes);

// connect to mlab - mongodb
mongoose
	.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log("Mongodb Connected..."))
	.catch(err => console.error(err));

// For production
if (isDev !== "dev") {
	app.use(sslRedirect()); //-- uncomment when pushing live live
	app.use(express.static(__dirname));
	app.use(express.static(path.join(__dirname, "frontend", "build")));

	app.get("*", function(req, res) {
		res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
	});
}

app.listen(port, () => console.log(`Server started on port: ${port}`));
