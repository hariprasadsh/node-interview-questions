const { Worker } = require("worker_threads");

const express = require("express");

const app = express();

// non blocking code
app.get("/non-blocking", (req, res) => {
	res.status(200).end("This page is non-blocking");
});

// blocking cpu-intensive code
app.get("/blocking", (req, res) => {
	// create a worker
	const worker = new Worker("./workers/worker.js");

	// listen for message from worker
	worker.on("message", (data) => {
		res.status(200).end(`This page is blocking: ${data}`);
	});

	worker.on("error", (error) => {
		res.status(500).end(`An error occurred: ${error}`);
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
