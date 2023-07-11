# ToDo List Web Application

This is a web application for managing a ToDo List. It allows users to add, edit, delete, and view tasks using a user-friendly interface. The application uses a server-client architecture where the client (web browser) communicates with a server to perform operations on the ToDo List.

## Features

- Add new tasks with optional image upload.
- Edit existing tasks.
- Mark tasks as complete.
- Delete tasks.
- View the list of tasks.

## Technologies Used

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: File system (data.txt)

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository: `git clone https://github.com/ssharmapavitra/webcrawler`
2. Navigate to the project directory: `cd todo-list`
3. Install the dependencies: `npm install`
4. Start the server: `node server.js`
5. Open your web browser and visit `http://localhost:3000`

## Usage

- Add a new task: Enter the task description and upload an optional image. Click the "Add" button to add the task to the list.
- Edit a task: Click the pen icon next to the task you want to edit. Enter the new task description and click "Save" to update the task.
- Mark a task as complete: Check the checkbox next to the task. The task will be visually marked as complete.
- Delete a task: Click the delete icon next to the task you want to delete. The task will be removed from the list.
- View all tasks: The application displays the list of tasks in a table format.


## Acknowledgements

- The idea of a ToDo List application inspired the project.
- The [Express](https://expressjs.com/) framework was used to build the server.
- [Multer](https://www.npmjs.com/package/multer) Middleware was used for handling file uploads.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you have any suggestions or improvements.

