const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Sorry ! Page Not Found");
});

app.post("/saveToDo", function (req, res) {
	console.log(req.body);
	res.end();
});

app.listen(port, () => {
	console.log("Example app listening at port: ", port);
});
