const { parentPort } = require("worker_threads");

let result = 0;
// simulate CPU-intensive task
for (let i = 0; i < 10000000000; i++) {
	result = Math.sqrt(i);
}

// message parent thread when done
parentPort.postMessage(result);
