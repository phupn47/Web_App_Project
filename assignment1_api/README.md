# Assignment #1 Create an API Server with Node.js & Express.js

This is the backend API server built with **Express.js**  
It provides routes for retrieving drone configuration, condition, and temperature logs.

## Features

- Retrieve drone configuration data from external PocketBase API.
- Get drone condition by ID.
- Create and view temperature logs.
- Support pagination and sorting by creation date.
- Handle CORS for frontend integration.

## Routes and HTTP Methods

| Method | Routes              | Description             |
| ------ | ------------------- | ----------------------- |
| `GET`  | `/configs/:droneId` | Get drone configuration |
| `GET`  | `/status/:droneId`  | Get drone condition     |
| `GET`  | `/logs/:droneId`    | Get drone logs          |
| `POST` | `/logs`             | Create a new drone log  |

## Example JSON Request

```json
{
  "drone_id": 66010608,
  "drone_name": "Exeoid",
  "country": "Japan",
  "celsius": 32
}
```

## Run the server

```bash
npm install
npm run dev
```

Server runs at: http://localhost:5000
