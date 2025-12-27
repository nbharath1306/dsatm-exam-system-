# DSATM Exam System Backend (Spring Boot)

This is the backend REST API for the DSATM Exam System, built with Java Spring Boot. It provides endpoints for managing students, subjects, and marks, and connects to a MySQL database.

## Project Structure
- `src/main/java/com/dsatm/examsystem/` — Source code (controllers, services, repositories, entities)
- `src/main/resources/` — Application configuration

## Features
- CRUD operations for Students, Subjects, and Marks
- RESTful API endpoints for integration with the React frontend
- MySQL database integration

## Setup Instructions
1. Ensure you have Java 17+ and Maven installed.
2. Configure your MySQL database in `src/main/resources/application.properties`.
3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints
- `/api/students` — Manage students
- `/api/subjects` — Manage subjects
- `/api/marks` — Manage marks

---

This folder will contain all backend source code and configuration.