//Variables to store
let taskId = 0;
const indexCount = "indexCount";
const textBox = document.getElementById("textarea");
const pen = `<svg xmlns=http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path></svg>`;
const del = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M5.72 5.72a.75.75 0 0 1 1.06 0L12 10.94l5.22-5.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L13.06 12l5.22 5.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L12 13.06l-5.22 5.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L10.94 12 5.72 6.78a.75.75 0 0 1 0-1.06Z"></path></svg>`;

//Accepting Enter key to add the task
function onTaskSubmit() {
	let imgFile = document.getElementById("fileUpload").files[0];
	//check if file is of or not
	if (imgFile == undefined) {
		alert("Please upload an image");
		return;
	}
	if (!imgFile.type.includes("image")) {
		alert("Please upload an image");
		return;
	}
	setImage(imgFile, (path) => {
		taskToAdd = textBox.value;
		textBox.value = "";
		addTaskToList(taskToAdd, path);
	});
	//clear file upload
	document.getElementById("fileUpload").value = "";
}

// function to add the task to the list
function addTaskToList(taskToAdd, path) {
	taskToAdd = taskToAdd.trim();
	if (taskToAdd == "") {
		alert("Please enter a valid task");
		return;
	}

	taskId++;
	let obj = {};
	obj.id = taskId;
	obj.task = taskToAdd;
	obj.status = false;
	obj.imgPath = path;
	setToDo(obj, appendToUl);
}

// function to append the task to the table
function appendToUl(obj) {
	var tableId = document.getElementById("table1");
	var row = document.createElement("tr");
	var c1 = document.createElement("td");
	var c2 = document.createElement("td");
	var c3 = document.createElement("td");
	var c4 = document.createElement("td");
	var c5 = document.createElement("td");
	var cimg = document.createElement("td");

	//Configure row
	row.setAttribute("id", `row${obj.id}`);
	row.setAttribute("class", "row");

	//Configure id
	c1.setAttribute("id", `id${obj.id}`);
	c1.setAttribute("class", "id");

	//Configure task
	c2.setAttribute("id", `task${obj.id}`);
	c2.setAttribute("class", "task");

	//Configure Image
	cimg.setAttribute("class", "taskImg");
	let img = document.createElement("img");
	img.setAttribute("src", obj.imgPath);
	cimg.appendChild(img);

	//Configure checkbox
	var check = document.createElement("input");
	check.type = "checkbox";
	check.id = `checkId${obj.id}`;
	check.setAttribute("onclick", `OnCheckUncheck(checkId${obj.id})`);
	//Check if the task is already checked
	if (obj.status == true) {
		row.setAttribute("class", "checked");
		check.checked = true;
	}

	//Configure pen icon
	c4.setAttribute("class", "pen");
	c4.setAttribute("id", `penId${obj.id}`);
	c4.setAttribute("onclick", `editTask(penId${obj.id})`);

	//Configure delete icon
	c5.setAttribute("class", "del");
	c5.setAttribute("id", `delId${obj.id}`);
	c5.setAttribute("onclick", `deleteTask(delId${obj.id})`);

	//adding values
	// c1.innerHTML = obj.id;
	c1.innerHTML = "--";
	c2.innerHTML = obj.task;
	c3.appendChild(check);
	c4.innerHTML = pen;
	c5.innerHTML = del;

	//appending to row
	row.appendChild(c1);
	row.appendChild(c2);
	row.appendChild(cimg);
	row.appendChild(c3);
	row.appendChild(c4);
	row.appendChild(c5);

	//appending row to table
	tableId.appendChild(row);
}

// function to check and uncheck the checkbox
function OnCheckUncheck(checkEle) {
	let index = checkEle.id.substring(7);
	if (checkEle.checked) {
		setObjStatus(index, true, () => {
			checkEle.parentNode.parentNode.setAttribute("class", "checked");
		});
	} else {
		setObjStatus(index, false, () => {
			checkEle.parentNode.parentNode.setAttribute("class", "");
		});
	}
}

// function to fetch all the data from the local storage
function fetchAll() {
	getTodo((list) => {
		taskId = list.length;
		for (let i = 0; i < taskId; i++) {
			if (list[i] != null) appendToUl(list[i]);
		}
	});
}

// function to clear all the data from the local storage
function clearAllData() {
	clearData(() => {
		let table = document.getElementById("table1");
		table.innerHTML = "";
		location.reload();
	});
}

// function to store the status of the checkbox in the local storage
function setObjStatus(index, status, callback) {
	getItem(index, (obj) => {
		obj.status = status;
		setToDo(obj, callback);
	});
}

// function to delete the task from the list
function deleteTask(delEle) {
	let index = delEle.id.substring(5);
	deleteToDo(index, () => {
		deleteRow(`row${index}`);
	});
}

//function to delete a row
function deleteRow(rowId) {
	let row = document.getElementById(rowId);
	row.parentNode.removeChild(row);
}

// function to edit the task
function editTask(penEle) {
	let index = penEle.id.substring(5);
	getItem(index, (obj) => {
		let task = prompt("Enter the task", obj.task);
		task = task.trim();
		if (task == null || task == "") {
			alert("Task cannot be empty");
			return;
		}
		obj.task = task;
		setToDo(obj, () => {
			document.getElementById(`task${index}`).innerHTML = task;
		});
	});
}

//-----------------------Server calls---------------------------------------------

//funtion to set image into database
function setImage(imgFile, callback) {
	let formData = new FormData();
	formData.append("taskImg", imgFile);
	let request = new XMLHttpRequest();
	request.open("POST", "/setImage", true);
	request.send(formData);
	request.addEventListener("load", () => {
		callback(JSON.parse(request.responseText));
	});
}
//function to get all values from server
function getTodo(callback) {
	let request = new XMLHttpRequest();
	request.open("GET", "/getToDo");
	request.send();
	request.addEventListener("load", () => {
		callback(JSON.parse(request.responseText));
	});
}

//function to get a particular item from server
function getItem(id, callback) {
	let obj = { index: id };
	let request = new XMLHttpRequest();
	request.open("POST", `/getItem`);
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(obj));
	request.addEventListener("load", () => {
		callback(JSON.parse(request.responseText));
	});
}

//function to set values to server
function setToDo(obj, callback) {
	let request = new XMLHttpRequest();
	request.open("POST", "/saveToDo");
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(obj));
	request.addEventListener("load", function () {
		callback(obj);
	});
}

//function to delete a particular item from server
function deleteToDo(id, callback) {
	let obj = { index: id };
	let request = new XMLHttpRequest();
	request.open("POST", "/deleteToDo");
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(obj));
	request.addEventListener("load", () => {
		callback();
	});
}

//function to clear all values from server
function clearData(callback) {
	let request = new XMLHttpRequest();
	request.open("GET", "/clearData");
	request.send();
	request.addEventListener("load", () => {
		callback();
	});
}

/*

//Schema
{
    "id": 1,
    "task": "Sample_task\n\t\t\t",
    "status": false
	"imgPath": " "
}

*/

/*

// function to edit the task
function editTask(penEle) {
	let index = penEle.id.substring(5);
	getItem(index, (obj) => {
		// let task = prompt("Enter the task", obj.task);
		//Show task on text box
		let box = document.getElementById("textarea");
		box.value = obj.task;
		box.focus();
		//Change the button to save
		let button = document.getElementById("addButton");
		button.innerHTML = "Save";
		button.setAttribute("onclick", `saveTask(${index})`);
	});
}

// function to save the task
function saveTask(index) {
	let obj = {};
	obj.id = index;
	let box = document.getElementById("textarea");
	let task = box.value;
	task = task.trim();
	if (task == null || task == "") {
		alert("Task cannot be empty");
		return;
	}
	obj.task = task;
	setToDo(obj, () => {
		document.getElementById(`task${index}`).innerHTML = task;
	});
	//remove the button
	let button = document.getElementById("addButton");
	button.innerHTML = "Add";
	button.setAttribute("onclick", "addTask()");
	//clear the text box
	box.value = "";
}



*/
