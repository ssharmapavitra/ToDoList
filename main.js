const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const port = 3000;

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Sorry ! Page Not Found");
});

//Saving an image to uploads
app.post("/setImage", upload.single("taskImg"), function (req, res) {
	let path = JSON.stringify(req.file.filename);
	res.send(path);
});

//Saving an object to ToDoList
app.post("/saveToDo", function (req, res) {
	// console.log(req.body);

	fs.readFile(__dirname + "/data/data.txt", "utf-8", (err, data) => {
		if (err) console.log(err);
		let todos;
		if (data.length === 0) todos = [];
		else todos = JSON.parse(data);

		//Seting object
		let obj = req.body;

		//new object
		if (obj.id > todos.length) {
			todos.push(req.body);
		}

		//Update object (override)
		else {
			let index = obj.id - 1;
			todos[index] = obj;
		}

		fs.writeFile("./data/data.txt", JSON.stringify(todos), () => {
			res.end();
		});
	});
});

//Getting an item from ToDo List
app.post("/getItem", function (req, res) {
	// console.log(req.body);
	fs.readFile(__dirname + "/data/data.txt", "utf-8", (err, data) => {
		if (err) console.log(err);
		let todos;
		if (data.length === 0) res.send("-1");
		else todos = JSON.parse(data);

		//Getting index
		let index = req.body.index - 1;
		if (index > todos.length) res.send("-1");
		else {
			res.json(todos[index]);
		}
	});
});

//Getting all items from ToDo List
app.get("/getToDo", function (req, res) {
	fs.readFile(__dirname + "/data/data.txt", "utf-8", (err, data) => {
		if (err) console.log(err);
		let todos;
		if (data.length === 0) todos = [];
		else todos = JSON.parse(data);
		res.json(todos);
	});
});

//Deleting an item from ToDo List
app.post("/deleteToDo", function (req, res) {
	// console.log(req.body);
	fs.readFile(__dirname + "/data/data.txt", "utf-8", (err, data) => {
		if (err) console.log(err);
		let todos;
		if (data.length === 0) res.send("-1");
		else todos = JSON.parse(data);

		//Getting index
		let index = req.body.index - 1;
		// console.log(index);
		if (index > todos.length) res.send("-1");
		else {
			todos[index] = null;
			fs.writeFile("./data/data.txt", JSON.stringify(todos), () => {
				res.end();
			});
		}
	});
});

//Clearing all items from ToDo List
app.get("/clearData", function (req, res) {
	fs.writeFile("./data/data.txt", "", () => {
		res.end();
	});
});

app.listen(port, () => {
	console.log("Example app listening at port: ", port);
});
