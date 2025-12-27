# DSATM Exam System - Local Setup Guide

This guide will help you (or your friend) run the full project (backend and frontend) on a laptop/PC with MySQL already installed.

---

## 1. Prerequisites
- **Java 17+** (for backend)
- **Node.js 16+ & npm** (for frontend)
- **MySQL** (already installed)
- **Git** (optional, for cloning)

---

## 2. MySQL Database Setup
1. Open a terminal and log in to MySQL:
	```sh
	mysql -u root -p
	```
2. Create the database and user:
	```sql
	CREATE DATABASE exam_system;
	CREATE USER 'exam_user'@'localhost' IDENTIFIED BY 'exam_pass';
	GRANT ALL PRIVILEGES ON exam_system.* TO 'exam_user'@'localhost';
	FLUSH PRIVILEGES;
	EXIT;
	```

---

## 3. Backend Setup (Spring Boot)
1. Open a terminal and go to the backend folder:
	```sh
	cd backend
	```
2. Create a file named `.env` in the backend folder with these contents:
	```env
	SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/exam_system?useSSL=false&serverTimezone=UTC
	SPRING_DATASOURCE_USERNAME=exam_user
	SPRING_DATASOURCE_PASSWORD=exam_pass
	SPRING_JPA_HIBERNATE_DDL_AUTO=update
	CORS_ALLOWED_ORIGINS=http://localhost:5173
	```
3. Run the backend:
	- If you have Maven installed:
	  ```sh
	  mvn spring-boot:run
	  ```
	- Or use the included wrapper:
	  ```sh
	  ./mvnw spring-boot:run
	  ```

The backend will start at: `http://localhost:8080`

---

## 4. Frontend Setup (React)
1. Open a new terminal and go to the frontend folder:
	```sh
	cd frontend
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Start the frontend:
	```sh
	npm run dev
	```

The frontend will start at: `http://localhost:5173`

---

## 5. Usage
- Open your browser and go to `http://localhost:5173`
- Log in, add students, subjects (with category), and marks as needed.
- The system will adapt marks entry based on subject category (PCC = theory, IPCC = theory+practical).

---

## 6. Troubleshooting
- If you get database errors, check your MySQL username/password and that MySQL is running.
- If ports 8080 (backend) or 5173 (frontend) are busy, stop other apps or change the port in config.

---

## 7. Stopping the App
- Press `Ctrl+C` in each terminal to stop backend and frontend.

---

## 8. Notes
- Data is stored in your local MySQL database.
- You can reset by dropping/recreating the database.

---

## 9. Need Help?
If you get stuck, ask for help with the error message you see!

---

Enjoy your project!