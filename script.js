//Variables to store
let taskToAdd;
let taskId = 0;
let data = "MyName";
//Creating task List (Array of Objects)
var taskList = [];
taskList.push(taskId);

//Clear local storage
//localStorage.clear();

//Enter to input task
var textBox = document.getElementById("textarea");
textBox.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		taskToAdd = textBox.value;
		textBox.value = "";

		let topr = document.getElementById("print");
		// topr.innerHTML = taskToAdd;
		addTaskToList(taskToAdd);
	}
});

function addTaskToList(taskToAdd) {
	taskId++;
	let obj = {};
	obj.id = taskId;
	obj.task = taskToAdd;
	obj.status = false;
	taskList.push(obj);
	appendToUl(obj);
	// console.log(taskList);
}

function appendToUl(obj) {
	var tableId = document.getElementById("table1");
	var row = document.createElement("tr");
	var c1 = document.createElement("td");
	var c2 = document.createElement("td");
	var c3 = document.createElement("td");

	//Configure checkbox
	var check = document.createElement("input");
	check.type = "checkbox";
	check.id = `checkId${obj.id}`;
	check.setAttribute("onclick", `OnCheckUncheck(checkId${obj.id})`);
	if (obj.check == true) {
		check.checked = false;
	}
	//adding values
	c1.innerHTML = obj.id;
	c2.innerHTML = obj.task;
	c3.appendChild(check);

	//appending to row
	row.appendChild(c1);
	row.appendChild(c2);
	row.appendChild(c3);

	//appending row to table
	tableId.appendChild(row);

	// console.log(row);
}

function OnCheckUncheck(checkEle) {
	// console.log(checkEle, typeof checkEle);
	let index = checkEle.id.at(-1);
	if (checkEle.checked) {
		checkEle.parentNode.parentNode.setAttribute("class", "checked");
		taskList[index].status = true;
	} else {
		checkEle.parentNode.parentNode.setAttribute("class", "");
		taskList[index].status = false;
	}
	store();
}

function store() {
	taskList[0] = taskId;
	let taskListJson = JSON.stringify(taskList);
	localStorage.setItem(data, taskListJson);
}

function fetch() {
	if (!localStorage.getItem(data)) {
		// alert("No data");
		return;
	}
	taskList = JSON.parse(localStorage.getItem(data));
	taskId = taskList[0];
	for (let i = 1; i < taskList.length; i++) {
		let obj = taskList[i];
		appendToUl(obj);
	}
}

function clearAllData() {
	localStorage.clear();
	location.reload();
}
