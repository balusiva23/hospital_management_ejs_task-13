Hospital Management System

This is a Hospital Management System built with Node.js, Express, EJS, Passport.js, and MongoDB. It allows admins to manage patients' data, including adding, updating, and deleting patient information.

Features
Admin login with email and password.
Secure authentication using Passport.js.
Data entry page to add new patients.
Patient listing page to view all entered patients' data.
Patient update page to modify patient information.
Patient delete functionality to remove patients from the system.
Installation
Clone this repository to your local machine:
bash
Copy code
git clone https://github.com/your-username/hospital-management-system.git
Install the required dependencies:
bash
Copy code
cd hospital-management-system
npm install
Set up MongoDB connection:

Rename the .env.example file to .env.
Replace MONGODB_URI with your MongoDB connection string in the .env file.
Start the application:

bash
Copy code
npm start
The application will be accessible at http://localhost:3000.

Admin Login
To access the admin features, you need to log in with the following credentials:

Email: admin@gmail.com
Password: admin
Please change the default login credentials for security purposes.

Folder Structure
The project has the following folder structure:

config: Contains the MongoDB connection setup file.
models: Defines the MongoDB schema and models for the application.
public: Contains static assets like CSS files.
routes: Defines the different routes for the application.
views: Contains EJS templates for different pages.
server.js: The main entry point of the application.
Contributing
If you find any issues or have suggestions for improvement, feel free to create a GitHub issue or submit a pull request.

License
This project is licensed under the MIT License.

Live Demo
You can access a live demo of the Hospital Management System on Heroku:

Live Demo

Author
Your Name
GitHub: your-username
