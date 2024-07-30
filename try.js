function getSum(a, b) {
	setTimeout(() => {
		return a + b;
	});
}

// const sum = getSum(20, 30);
// console.log(`sum: ${sum}`);
// ! this can be solved by using promises and callbacks

// * print the global object
//console.log(process); //! process is one of the global objects

// * process.cwd vs __dirname
console.log(process.cwd()); //! it returns the current working directory. it's a global object
console.log(__dirname); //! it returns the name of the directory containing the source file. it's local to each module

process.stdout.write("Hello World!" + "\n");

process.argv.forEach(function (val, index, array) {
	console.log(index + ": " + val);
});
