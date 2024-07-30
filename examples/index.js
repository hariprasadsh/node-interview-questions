// *create a server with express
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// *use cors middleware
app.use(cors);

// set the port
const port = 3000;

// set body-parser
app.use(bodyParser.json());

// middleware
app.get("/", (req, res) =>
	res.send(`<div><h1>Node server is up and running in port ${port}</h1></div>`)
);

// start the server
app.listen(port, () => console.log(`Server started at ${port}`));

// *create a server without express
// const http = require("http");

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader("Content-Type", "text/plain");
// 	res.end("Hello, World!");
// });
