import express from "express";

const app = express();

/**
 * A route handler for a heavy task endpoint. This endpoint performs a simple loop operation
 * and sends the result back to the client.
 *
 * @param {express.Request} req - The request object representing the HTTP request.
 * @param {express.Response} res - The response object representing the HTTP response.
 *
 * @returns {void}
 */
app.get("/heavy", (req, res) => {
	let total = 0;
	for (let i = 0; i < 50000000; i++) {
		total++;
	}
	res.send(`Heavy task completed with a total of ${total}\n`);
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
	console.log(`worker pid: ${process.pid}`);
});
