# Online Lecture Scheduling Module

## Overview
This project is a MERN-based lecture scheduling module with two panels:

1. Admin panel
2. Instructor panel

The admin can:

1. View all instructors
2. Add courses
3. Add lectures and assign them to instructors by date

The system prevents instructor double-booking on the same date.

## Tech Stack

1. Frontend: React (Vite), Tailwind CSS
2. Backend: Node.js, Express.js
3. Database: MongoDB (Mongoose)
4. Authentication: Cookie-based JWT session

## Core Features

1. Login with role-based redirect:
	- Admin -> /admin
	- Instructor -> /instructor
2. Admin can create courses
3. Admin can create lectures with:
	- title
	- description
	- date
	- course
	- instructor
4. Instructor dashboard shows assigned lectures with course name and date
5. Duplicate protection:
	- Application-level check for same instructor + same day
	- Database unique index on instructor + date

## Project Structure

1. backend: Express API and MongoDB models
2. frontend: React application



## Routes and Links

### Frontend Routes

1. / -> Login
2. /admin -> Admin dashboard
3. /instructor -> Instructor dashboard

### Backend API Routes

Public:

1. POST /login

Protected Admin:

1. GET /admin/instructors
2. GET /admin/courses
3. GET /admin/lectures
4. POST /admin/course
5. POST /admin/lecture

Protected Instructor:

1. GET /instructor/lectures

## Deployment

Detailed deployment steps are available in DEPLOYMENT.md.

Deployment targets:

1. Backend: Railway (service root: backend)
2. Frontend: Netlify (base directory: frontend)

## Credentials for Review Submission

Add your final hosted values before submission:

1. Admin login:
	- username: <admin_username>
	- password: <admin_password>
2. Instructor login:
	- username: <instructor_username>
	- password: <instructor_password>

## Database Dump

Provide a MongoDB dump in your submission package.

Example command:

1. mongodump --uri="<your_mongo_uri>" --out="./database-dump"

## What To Share With Ideamagix

Share all of the following:

1. Live project URL (Netlify frontend)
2. Backend server URL (Railway API base URL)
3. Admin login credentials
4. Instructor login credentials
5. Server credentials requested by company (if explicitly required by your HR contact)
6. Screen recording drive link (public access enabled)
7. Source code link:
	- Git repository URL or
	- Google Drive link
8. Database dump file/folder
9. This README.md with routes and setup details

## Submission Email Format

Subject:

1. Your Name - Review Test Assignment

Body checklist:

1. Frontend live URL
2. Backend live URL
3. Admin credentials
4. Instructor credentials
5. Screen recording link
6. Code repository/drive link
7. Database dump link/file reference
