Library Management System
This is a Library Management System that allows users to manage book records. It includes a backend built with Node.js and MySQL for the database, and a frontend for user interaction.

Features
Add new books
View all books
Update book details
Delete books
Search for books
Installation Guide
Prerequisites
Ensure you have the following installed on your system:

Node.js (v14 or higher)
MySQL Server
A package manager like npm (comes with Node.js)
1. Clone the Repository
bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
2. Install Dependencies
Navigate to the project directory and install the required Node.js dependencies:

bash
npm install
3. Database Setup
Start your MySQL server.
Create the Database:
sql
CREATE DATABASE library_management;
Switch to the Database:
sql
USE library_management;
Create the Table:
sql
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    isbn VARCHAR(13) UNIQUE,
    publication_date DATE,
    available_copies INT DEFAULT 0
);
Insert Sample Data:
sql
INSERT INTO books (title, author, genre, isbn, publication_date, available_copies)
VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', '9780743273565', '1925-04-10', 5),
    ('1984', 'George Orwell', 'Dystopian', '9780451524935', '1949-06-08', 3),
    ('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '9780061120084', '1960-07-11', 4),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', '9780544003415', '1954-07-29', 9),
    ('The Alchemist', 'Paulo Coelho', 'Adventure', '9780061122415', '1988-05-01', 20);



5. Run the Backend Server
Start the server by running:
npx nodemon server.js
The server will start on http://localhost:3000.

6. Frontend Setup
Open the index.html file in the frontend directory using a browser. Ensure the backend server is running for the frontend to work properly.

API Endpoints
Method	Endpoint	Description
GET	/books	Fetch all books
POST	/books/add	Add a new book
PUT	/books/update/:id	Update book details
DELETE	/books/delete/:id	Delete a book by its ID
Project Structure
bash
library-management-system/
├── backend/
│   ├── controllers/
│   │   └── booksController.js
│   ├── models/
│   │   └── db.js
│   ├── routes/
│   │   └── books.js
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
├── .env
├── package.json
├── README.md
Contributing
Feel free to fork the repository, make changes, and submit a pull request!

License
This project is licensed under the MIT License. See the LICENSE file for details.