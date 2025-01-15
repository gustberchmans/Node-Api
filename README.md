# **Node API Project**

This project is a simple Node.js API with CRUD functionality for users and posts, built with Express and Sequelize. Below is a step-by-step guide to set up, run, and use the API.

---

## **1. Prerequisites**
Before using this project, ensure the following are installed on your system:
- **Node.js**: [Download here](https://nodejs.org)
- **Postman**: [Download here](https://www.postman.com/)

---

## **2. Installation**

1. Clone the repository:
   ```bash
   git clone gustberchmans/Node-Api
   cd node-api
   ```

2. Install dependencies:
   ```bash
   npm init -y
   npm install express
   npm install sequelize sqlite3
   ```

3. Start the server:
   ```bash
   node app.js
   ```

By default, the server will run at `http://localhost:3000`.

---

## **3. API Documentation**
You can view the list of all endpoints in your browser by visiting:
```bash
http://localhost:3000/
```

Alternatively, here’s an overview of the API endpoints:

### **Users Endpoints**
- **GET /users**: List all users  
  Example Response:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```

- **POST /users**: Create a new user  
  Example Body (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- **GET /users/:id**: Get a user by ID  
  Example URL: `http://localhost:3000/users/1`

- **PUT /users/:id**: Update a user by ID  
  Example Body (JSON):
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```

- **DELETE /users/:id**: Delete a user by ID  
  Example URL: `http://localhost:3000/users/1`

---

### **Posts Endpoints**
- **GET /posts**: List all posts  
  Example Response:
  ```json
  [
    {
      "id": 1,
      "title": "My First Post",
      "content": "This is the content of my first post",
      "UserId": 1
    }
  ]
  ```

- **POST /posts**: Create a new post  
  Example Body (JSON):
  ```json
  {
    "title": "My First Post",
    "content": "This is my first post content",
    "UserId": 1
  }
  ```

- **GET /posts/:id**: Get a post by ID  
  Example URL: `http://localhost:3000/posts/1`

- **PUT /posts/:id**: Update a post by ID  
  Example Body (JSON):
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

- **DELETE /posts/:id**: Delete a post by ID  
  Example URL: `http://localhost:3000/posts/1`

- **GET /posts?limit=&offset=**: Get posts with pagination  
  Example URL: `http://localhost:3000/posts?limit=5&offset=10`

- **GET /posts/search?query=**: Search posts by title or author  
  Example URL: `http://localhost:3000/posts/search?query=mytitle`

---

## **4. Using the API with Postman**
Follow these steps to test the API endpoints:

1. Open Postman.
2. Select the HTTP method (e.g., GET, POST).
3. Enter the API endpoint URL.
4. If required, add a request body in JSON format (e.g., for POST or PUT).
5. Click **Send** to test the endpoint.

For example:
- **Creating a user**:
  - Method: POST
  - URL: `http://localhost:3000/users`
  - Body (JSON):
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```

---

https://chatgpt.com/share/6787c63a-4218-800b-9b88-ee066a6cb826