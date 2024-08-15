const { workerData, parentPort } = require("worker_threads");

let result = 0;
// simulate CPU-intensive task
for (let i = 0; i < 10000000000 / workerData.thread_count; i++) {
	result = Math.sqrt(i);
}

parentPort.postMessage(result);
