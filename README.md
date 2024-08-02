# RESTful API for Managing a Book Collection

## Overview

This project involves developing a RESTful API for managing a book collection with enhanced user and role management features using bit masks. The API allows users to add, view, update, and delete books. It also includes functionalities for user registration, authentication, and role management.

## Requirements

### 1. Add a Book
- **HTTP Method:** POST
- **Endpoint:** `/books`
- **Request Body:** JSON with fields `title`, `author`, `publicationDate`, `genres`
- **Response:** JSON with the data of the added book
- **Authentication:** Required (Only for users with the "administrator" role)

### 2. Get List of Books
- **HTTP Method:** GET
- **Endpoint:** `/books`
- **Response:** JSON array with data of all books

### 3. Get Book by ID
- **HTTP Method:** GET
- **Endpoint:** `/books/:id`
- **Response:** JSON with the data of the book

### 4. Update Book Information
- **HTTP Method:** PUT
- **Endpoint:** `/books/:id`
- **Request Body:** JSON with fields `title`, `author`, `publicationDate`, `genres`
- **Response:** JSON with the data of the updated book
- **Authentication:** Required (Only for users with the "administrator" role)

### 5. Delete a Book
- **HTTP Method:** DELETE
- **Endpoint:** `/books/:id`
- **Authentication:** Required (Only for users with the "administrator" role)

### 6. Register a User
- **HTTP Method:** POST
- **Endpoint:** `/users/register`
- **Request Body:** JSON with fields `username`, `password`, `email`
- **Email Confirmation:** Required
- **Response:** JSON with the data of the registered user

### 7. Authenticate a User
- **HTTP Method:** POST
- **Endpoint:** `/users/login`
- **Request Body:** JSON with fields `username`, `password`
- **Response:** JSON with a JWT token

### 8. Get Current User Information
- **HTTP Method:** GET
- **Endpoint:** `/users/me`
- **Response:** JSON with the data of the current user
- **Authentication:** Required

### 9. Change User Role
- **HTTP Method:** PUT
- **Endpoint:** `/users/:id/role`
- **Request Body:** JSON with field `role` (use bit masks for roles)
- **Response:** JSON with the data of the updated user
- **Authentication:** Required (Only for users with the "administrator" role)

## Additional Requirements

- Use Node.js and one of the frameworks (e.g., Express.js, Koa.js)
- Use a database (e.g., MongoDB, PostgreSQL, or any other of your choice)
- Code must be well-structured and readable
- Implement authentication and authorization using JWT
- Use TypeScript
