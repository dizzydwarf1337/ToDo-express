# ToDo Express API

A RESTful API backend for a ToDo application built with Express.js, PostgreSQL, and Sequelize ORM. Features JWT authentication and comprehensive task management capabilities.

## Features

- 🔐 User authentication with JWT
- ✅ Full CRUD operations for tasks
- 👤 User profile management
- 🗄️ PostgreSQL database with Sequelize ORM
- ✨ Input validation with express-validator
- 🛡️ Secure password hashing
- ⚡ Async error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **express-validator** - Input validation
- **express-async-handler** - Async error handling

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dizzydwarf1337/ToDo-express.git
cd ToDo-express
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
POSTGRES_CS=postgresql://username:password@localhost:5432/todo_db
JWT_KEY=your_generated_jwt_secret_key
```

4. The database tables will be created automatically on first run with Sequelize sync.

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. Or run with Docker:
```bash
# Build and start containers
docker compose up --build

# Run in detached mode
docker compose up -d

# Stop containers
docker compose down
```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login user and receive JWT token | No |

#### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "john_doe",
  "password": "securePassword123"
}
```

#### Login User
```bash
POST /auth/login
Content-Type: application/json

{
  "name": "john_doe",
  "password": "securePassword123"
}
```
### Task Routes

All task routes require JWT authentication. Include the token in the Authorization header:
```
Authorization: <your_jwt_token>
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks for authenticated user |
| POST | `/tasks/addTask` | Create a new task |
| GET | `/tasks/:id` | Get a specific task by ID |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

#### Get All Tasks
```bash
GET /tasks
Authorization: <your_jwt_token>
```

#### Create Task
```bash
POST /tasks/addTask
Authorization: <your_jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write README and API documentation",
}
```

#### Get Task by ID
```bash
GET /tasks/UUID
Authorization: <your_jwt_token>
```

#### Update Task
```bash
PUT /tasks/UUID
Authorization: <your_jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "description: : "Updated task description"
}
```

#### Delete Task
```bash
DELETE /tasks/UUID
Authorization: <your_jwt_token>
```

### User Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| PUT | `/users/update` | Update user profile | Yes |

#### Update User
```bash
PUT /users/update
Authorization: <your_jwt_token>
Content-Type: application/json

{
  "name": "new_name",
}
```

## Database Schema

### User Model
```javascript
{
  id: UUID (Primary Key),
  name: STRING,
  password: STRING (Hashed),
  createdAt: DATE,
  updatedAt: DATE
}
```

### Task Model
```javascript
{
  id: UUID (Primary Key),
  name: STRING,
  description: STRING (Optional),
  userId: UUID (Foreign Key)
}
```

## Project Structure

```
ToDo-express/
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── tasksController.js      # Task CRUD operations
│   └── usersController.js      # User management
├── models/
│   ├── task.js                 # Task model definition
│   └── user.js                 # User model definition
├── routes/
│   ├── auth.js                 # Authentication routes
│   ├── tasks.js                # Task routes
│   └── users.js                # User routes
├── validators/
│   ├── authValidators.js       # Auth input validation
│   ├── taskValidators.js       # Task input validation
│   ├── userValidators.js       # User input validation
│   └── common/
│       └── idValidator.js      # ID parameter validation
├── config/
│   └── database.js             # Database configuration
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── app.js                   # Entry point
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
POSTGRES_CS=postgresql://username:password@localhost:5432/database_name
JWT_KEY=your_jwt_secret_key_here
```

## Error Handling

The API uses express-async-handler for handling async errors. All validation errors return a 400 status code with detailed error messages. Authentication errors return 401, and authorization errors return 403.

Example error response:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Input validation on all endpoints
- SQL injection prevention via Sequelize ORM
- Environment variables for sensitive data


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**dizzydwarf1337**
- GitHub: [@dizzydwarf1337](https://github.com/dizzydwarf1337)

---

Built with ❤️ using Express.js and PostgreSQL
