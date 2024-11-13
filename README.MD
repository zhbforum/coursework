# Description about project and stack 

# This project was created for course work No. 1 for KhPI. 

The project uses MySQL for the database, 
Node.js for the backend logic. 
Express.js for running an API that simplifies working with routes, requests and responses, a framework for node.js. 
React library which is involved in the frontend part. Also the axios library for react, which performs http requests for api


<p align="center">
  <img src="photos/90px-MySQL_logo.svg.png" alt="MySQL Logo" width="150" height="100"/>
  <img src="photos/image_no_background.png" alt="Node.js Logo" width="150" height="100"/>
  <img src="photos/image_react_no_background_v2.png" alt="Node.js Logo" width="150" height="100"/>
</p>

# Coursework Project Setup

This guide will walk you through the steps to set up and run the project. Follow these instructions to get started with the backend server and the frontend interface.

## Prerequisites

- Make sure you have Node.js and npm installed on your system.
- If you're on a Unix-based system (like macOS or Linux), you’ll also need `git` and may need `sudo` for certain commands.

## Clone the Repository

First, clone the repository:

```bash
git clone https://github.com/zhbforum/coursework
```

Then, navigate to the project directory:

```bash
cd coursework
```

## Setting up the Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node server.js
   ```

   This will launch the backend server.

### For Unix-based Systems

If you are using a Unix-based system (Linux, macOS), you may need to use `sudo` to start the server:

```bash
sudo node server.js
```

After the server starts, verify that it’s running by checking the console output for confirmation.

## Setting up the Frontend

1. After confirming the backend server is running, navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Start the UI:

   ```bash
   npm start
   ```

   If prompted to run on a different port (since the server uses port 3000), press `Y` to confirm. React will start the frontend server on an available port and open a browser window with the UI.

Enjoy working with the design interface!

## Additional Notes

- **Frontend:** The frontend is developed with React. If you encounter any issues with `npm start`, try reinstalling dependencies with `npm install`.
- **Backend:** Ensure the backend is running before starting the frontend to ensure full functionality.
