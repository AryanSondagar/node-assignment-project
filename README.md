# node-assignment-project
A RESTful backend service built with nodejs Web API providing secure and scalable endpoints for frontend applications.

1. Setup Instructions
git clone <your-repo-url>
cd <project-folder>

2. Install Dependencies
npm install

3. Create .env file
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key

4. Run Server
npm run dev
# or
node server.js

Authentication APIs :-
| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |


Post APIs :-
| Method | Endpoint                | Description         | Auth |
| ------ | ----------------------- | ------------------- | ---- |
| POST   | /api/posts              | Create post         | Yes  |
| GET    | /api/posts              | Get paginated posts | No   |
| POST   | /api/posts/:id/like     | Like / Unlike post  | Yes  |
| GET    | /api/posts/user/:userId | Get posts by user   | No   |


Folder Structure :-

/controllers
/models
/routes
/middleware
.env
server.js