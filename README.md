# app-requests-nodejs

This project is a full-stack application that uses a Model-View-Controller (MVC) architecture. The project adheres to SOLID principles, with an emphasis on the **Single Responsibility Principle** to ensure clean, maintainable code.

## Project Structure
The project is divided into two main directories:
- **client**: Contains the frontend implementation.
- **server**: Contains the backend implementation.

## Live Endpoints

- **Frontend** (hosted on **Netlify**): [https://app-requests-front.netlify.app/dashboard](https://app-requests-front.netlify.app/dashboard)
- **Backend** (hosted on **Heroku**): [https://api-requests-93d7054ed472.herokuapp.com/](https://api-requests-93d7054ed472.herokuapp.com/)

### Hosting Details:
- The **frontend** was deployed using **Netlify**, a platform that allows easy deployment and hosting for static client projects.
- The **backend** was deployed using **Heroku**, a cloud platform that simplifies the process of deploying and running Node.js applications.

## Backend

### Technologies Used:
- **Node.js** (v18.2)
- **MongoDB** (NoSQL database)
- **Jest** (for unit testing)
- **JWT** (JSON Web Token for authentication)
- **Bcrypt** (for password hashing)

### API Endpoints:

#### 1. Login
- **Method**: `POST`
- **Endpoint**: `/api/login`
- **Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

#### 2. Signup
- **Method**: `POST`
- **Endpoint**: `/api/signup`
- **Body**:
    ```json
    {
      "email": "string",
      "password": "string",
      "role": "number"
    }
    ```

#### 3. Get Requests
- **Method**: `GET`
- **Endpoint**: `/api/requests`

### Authentication:
The application uses **JWT** (JSON Web Token) for both login and signup processes. The token contains the hashed account role (`role`), which defines the permissions:
- `1 = Administrator`
- `2 = Employee`

### Database:
The backend uses a NoSQL database (MongoDB), with two collections:
- **Users**: Contains user information.
- **Requests**: Stores user requests.

The database is hosted on a free MongoDB Atlas cluster.

## Frontend

### Technologies Used:
- **React** (v18.3.1)
- **React Router DOM** (for routing)
- **JWT** (for token-based authentication)
- **Material-UI** (for UI components)
- **Context API** (for global state management)
- **Custom Hooks** (for encapsulating reusable logic)

## How to Run the Project

1. **Install Backend Dependencies**:
    Navigate to the `server` directory and run:
    ```bash
    npm install
    ```

2. **Install Frontend Dependencies**:
    Navigate to the `client` directory and run:
    ```bash
    npm install
    ```

3. **Run the Backend**:
    In the `server` directory, start the Node.js server:
    ```bash
    npm start
    ```

4. **Run the Frontend**:
    In the `client` directory, start the React application:
    ```bash
    npm start
    ```

## Conclusion
This project demonstrates the use of MVC architecture with a full-stack implementation in Node.js and React. The backend is secured with JWT-based authentication, and the frontend uses React and Material-UI for a seamless user experience. The frontend is hosted on **Netlify**, and the backend is hosted on **Heroku**.
