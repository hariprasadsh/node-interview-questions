const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;
const THREAD_COUNT = 2;

app.get("/non-blocking/", (req, res) => {
	res.status(200).send("This page is non-blocking");
});

function createWorker() {
	return new Promise(function (resolve, reject) {
		const worker = new Worker("./workers/two-workers.js", {
			workerData: { thread_count: THREAD_COUNT },
		});
		worker.on("message", (data) => {
			resolve(data);
		});
		worker.on("error", (msg) => {
			reject(`An error ocurred: ${msg}`);
		});
	});
}

app.get("/blocking", async (req, res) => {
	const workerPromises = [];
	for (let i = 0; i < THREAD_COUNT; i++) {
		workerPromises.push(createWorker());
	}
	const thread_results = await Promise.all(workerPromises);
	console.log(thread_results);
	const total = thread_results[0] + thread_results[1];
	res.status(200).send(`result is ${total}`);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
