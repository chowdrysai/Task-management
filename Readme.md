# Node.js Project
Task-Management

## Description

This is a Node.js application designed to [briefly explain the purpose of your project]. The project demonstrates [mention key features, e.g., RESTful API creation, database integration, etc.].

## Getting Started

These instructions will guide you through setting up the project locally.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: >= 18.x
- **npm** (or **yarn**) for package management
- A database system if the project uses - postreSql

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git

2. **Enter into directory:**
    ```bash
   cd your-repo-name
   
---

##  Setup

1. **Environment Variables:**

    Create a **.env** file in the root of the project to configure your environment variables. Below is an example of the variables you may need:
    ```bash
    # Database Configuration
        DB_USER = postgres
        DB_PASSWORD = Saikumar45
        DB_HOST = database-1.c30wc4giwsyo.ap-south-1.rds.amazonaws.com
        DB_NAME = demo
        DB_PORT = 5432
        
    # Application Configuration
        PORT = 3000
2. **Install Dependencies:**

    Run the following command to install all required dependencies:
    ```bash
    npm install

3. **Start the Application:**

    Run the following command to start the server:
    ```bash
    npm start
4. **Verify Setup:**
   Open your browser or an API testing tool like Postman and visit:
    ```bash
   http://localhost:3000/tasks
   
 ---
 
## API Endpoints

1. **POST /tasks**:
    
- Description: 
        Create a new task.
- Payload:
     ```bash
     {
  "title": "Sample Task",
  "description": "This is a sample task",
  "due_date": "2025-01-30"
}

2. **2. GET /tasks**:
    
- Description: Retrieve all tasks, including their calculated status.
- Sample Response:
     ```bash
     [
          {
            "id": 1,
            "title": "Sample Task",
            "description": "This is a sample task",
            "due_date": "2025-01-30",
            "status": "Pending",
            "completed_at": null,
            "created_at": "2025-01-20T12:00:00Z",
            "updated_at": "2025-01-20T12:00:00Z"
          }
    ]

3. **PUT /tasks/{id}**:
    
- Description: Update task details.
- Payload:
    ```bash
    {
      "title": "Updated Task Title",
      "description": "Updated description",
      "due_date": "2025-02-01"
    }

4. **PUT /tasks/{id}/complete**:
- Description: Mark a task as completed and update the completed_at timestamp.
- Response:
    ```bash
    {
      "id": 1,
      "status": "Completed",
      "completed_at": "2025-01-25T15:00:00Z"
    }
5. **DELETE /tasks/{id}**:
- Description: Delete a task by its ID.
- Response:
    ```bash
    {
      "message": "Task deleted successfully",
      "task": {
        "id": 1,
        "title": "Sample Task"
      }
    }

6. **GET /tasks/search**:
- Description: Search for tasks using keywords in the title or description.
- Query Parameters:
    **keyword** (required)
    ```bash
    GET /tasks/search?keyword=sample

---

##  Deployment

To deploy the application on AWS Lambda with API Gateway:
    
1. Ensure AWS credentials are configured on your machine.
2. Package and deploy the application:
    
    ```bash
    npm run deploy
3. Use the provided API Gateway endpoint for testing.
