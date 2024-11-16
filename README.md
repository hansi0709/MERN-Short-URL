# MERN Short URL
A full-stack URL shortening application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This application enables users to generate shortened URLs for long web links, manage them, and track their usage.

## Features
Shorten long URLs into custom or randomly generated short links.
Redirect to the original URL when accessing the short URL.
Simple and clean user interface.
Backend APIs for managing short URLs.
MongoDB integration for storing URLs and their metadata.
Error handling for invalid or expired links.

## Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
##Libraries:
nanoid for generating unique IDs for short URLs.
dotenv for managing environment variables.
cors for handling Cross-Origin Resource Sharing.

## Installation
Follow the steps below to run this project locally:

1. Clone the Repository
git clone https://github.com/<your-username>/MERN-Short-URL.git
cd MERN-Short-URL
2. Set Up the Backend
Navigate to the backend directory:
cd backend
Install dependencies:
npm install
Create a .env file in the backend directory and add the following environment variables:
makefile
MONGO_URI=<Your MongoDB connection string>
PORT=5000
Start the backend server:
npm start
3. Set Up the Frontend
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Start the React development server:
npm start

## API Endpoints
Base URL: http://localhost:5000
POST /api/shorten
Description: Create a new short URL.
Request Body:
{
  "originalUrl": "https://example.com"
}
Response:
{
  "shortUrl": "http://localhost:5000/abcd1234"
}
GET /:shortId

Description: Redirect to the original URL for the given short ID.


## Usage
Open the frontend application in a browser at http://localhost:3000.
Enter a long URL in the input field and click "Shorten".
Copy the generated short URL and use it to redirect to the original URL.
