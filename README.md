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

## Database Dump

check folder database-dump in repo
