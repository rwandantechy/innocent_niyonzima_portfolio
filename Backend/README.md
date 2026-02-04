My Portfolio — Backend

This is a minimal Node + Express scaffold for the portfolio project.

Structure:
- src/
  - controllers/
  - routes/
  - services/
  - models/
  - middlewares/
  - utils/

Quick start:
1. cd Backend
2. npm install
3. npm run dev

APIs:
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects
- POST /api/auth/login
- POST /api/auth/register

This scaffold uses an in-memory store to keep things simple. Replace with a database when ready.

MongoDB
------
This scaffold can connect to MongoDB. Create a `.env` file in the `Backend/` folder (see `.env.example`) and set `MONGO_URI` to your connection string.

Example:

MONGO_URI=mongodb+srv://<user>:<password>@yourcluster.mongodb.net/mydb

The server will attempt to connect to the database before starting. If the connection fails the process will exit with an error.
