# Device Dashboard API

This project is a basic device management dashboard API built using **Node.js** with **MongoDB** as the database. It allows you to create, update, delete, and list devices. The backend uses **Jest** and **Supertest** for testing.
## Features

- **CRUD** operations for devices.
- **Unique Serial Number Validation** to avoid duplication.
- **RESTful API** implementation.
- **MongoDB** integration with **Mongoose**.
- **Error Handling** with proper status codes and messages.
- Basic **CORS** setup for cross-origin requests.

## Tech Stack

- **Node.js**
- **React.js**
- **MongoDB** with **Mongoose**
- **Jest** and **Supertest** for testing

## Prerequisites

Make sure you have the following installed:

- **Node.js**: version 12 or above
- **MongoDB**: local instance or cloud (e.g., MongoDB Atlas)
- **NPM** or **Yarn**: for package management

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/device-dashboard.git
    ```

2. Navigate to the project folder:

    ```bash
    cd device-dashboard
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
PORT=5001
MONGO_URI=mongodb://localhost:27017/devicedb
```

Alternatively, you can set up a MongoDB Atlas URI in the `MONGO_URI` field for a cloud database.

## Running the Application

To run the app locally:


npm start


By default, the server runs on http://localhost:5001.




