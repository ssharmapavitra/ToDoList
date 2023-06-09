//Variables to store
let taskId = 0;
let indexCount = "indexCount";

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

// function to add the task to the list
function addTaskToList(taskToAdd) {
	taskId++;
	let obj = {};
	obj.id = taskId;
	obj.task = taskToAdd;
	obj.status = false;
	store(obj, taskId);
	appendToUl(obj);
	// console.log(taskList);
}

// function to append the task to the table
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
	if (obj.status == true) {
		row.setAttribute("class", "checked");
		check.checked = true;
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
}

// function to check and uncheck the checkbox
function OnCheckUncheck(checkEle) {
	let index = checkEle.id.at(-1);
	if (checkEle.checked) {
		checkEle.parentNode.parentNode.setAttribute("class", "checked");
		setObjStatus(index, true);
		// taskList[index].status = true;
	} else {
		checkEle.parentNode.parentNode.setAttribute("class", "");
		setObjStatus(index, false);
		// taskList[index].status = false;
	}
}

// function to store the data in the local storage
function store(obj, index) {
	localStorage.setItem(indexCount, index);
	let taskListJson = JSON.stringify(obj);
	localStorage.setItem(index, taskListJson);
	console.log(index, typeof index);
}

function fetchAll() {
	if (!localStorage.getItem(indexCount)) {
		localStorage.setItem(indexCount, 0);
		// alert("No data");
		return;
	}
	taskId = localStorage.getItem(indexCount);
	for (let i = 1; i <= taskId; i++) {
		let obj = JSON.parse(localStorage.getItem(i));
		appendToUl(obj);
	}
}

// function to clear all the data from the local storage
function clearAllData() {
	localStorage.clear();
	location.reload();
}

// function to store the status of the checkbox in the local storage
function setObjStatus(index, status) {
	let obj = JSON.parse(localStorage.getItem(index));
	obj.status = status;
	localStorage.setItem(index, JSON.stringify(obj));
}
