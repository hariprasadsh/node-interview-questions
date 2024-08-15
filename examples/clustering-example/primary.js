import cluster from "cluster";
import os from "os";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const cpuCount = os.cpus().length;
console.log(`Total CPU count: ${cpuCount}`);
console.log(`primary processid: ${process.pid}`);

cluster.setupPrimary({
	exec: `${__dirname}/index.js`,
});

/**
 * This function forks a new worker process for each CPU core in the system.
 * It is used to distribute the workload across multiple processes to improve performance.
 *
 * @function forkWorkers
 * @param {number} cpuCount - The total number of CPU cores available on the system.
 * @param {cluster.Cluster} cluster - The cluster module that manages worker processes.
 *
 * @returns {void}
 */
for (let i = 0; i < cpuCount; i++) {
	cluster.fork();
}

/**
 * This function is a callback function that handles the 'exit' event emitted by the cluster module.
 * It logs the details of the worker process that has exited and starts a new worker process.
 *
 * @callback clusterExitCallback
 * @param {cluster.Worker} worker - The worker process that has exited.
 * @param {number} code - The exit code of the worker process. If the worker exited due to an uncaught exception, this will be 1.
 * @param {string} signal - The name of the signal (e.g., 'SIGINT', 'SIGUSR2') that caused the worker process to terminate.
 *
 * @returns {void}
 */
cluster.on("exit", (worker, code, signal) => {
	console.log(
		`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
	);
	console.log("Starting a new worker...");
	cluster.fork();
});
