# Docs Playground Frontend

This is the frontend for [**Docs Playground**](https://docs-playground-client.vercel.app/), a web application that allows users to create, edit, and delete documents. It utilizes **Google OAuth** for authentication and communicates with a backend API built with **Node.js** and **Express.js**. The application is styled with **Tailwind CSS** and animations are powered by **Framer Motion**.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Installation and Setup](#installation-and-setup)
4. [Environment Variables](#environment-variables)
5. [Project Structure](#project-structure)
6. [Google OAuth Integration](#google-oauth-integration)
7. [Animations](#animations)
8. [Styling](#styling)
9. [Deployment](#deployment)

## Tech Stack

- **React.js**: The JavaScript library for building user interfaces.
- **Framer Motion**: Used for adding smooth animations to enhance user experience.
- **React Toastify**: Used for toast notifications (e.g., success or error messages).
- **Google OAuth**: For user authentication, allowing users to sign in using their Google account.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Fetch API**: For sending and receiving data from the backend API.

## Features

- **Google OAuth Login**: Users can sign in with their Google accounts securely.
- **Document Management**: Users can create, edit, and delete documents.
- **User Profile**: Displays user profile picture and name retrieved from Google.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile screens.
- **Toast Notifications**: Provides feedback for user actions such as document creation, errors, or successful logins.
- **Smooth Animations**: Framer Motion is used to add subtle and engaging animations throughout the application.

## Installation and Setup

1. **Clone the Repository**

   First, clone the frontend repository to your local machine using Git.

   ```bash
   git clone https://github.com/your-username/docs-playground-frontend.git
   ```
2. **Navigate to the Frontend Directory**

   Move into the frontend directory (`client`) to install dependencies and start the development server.

   ```bash
   cd docs-playground-client
   ```
3. **Install Dependencies**

   Run the following command to install necessary packages.

   ```bash
   npm install
   ```
4. **Create a `.env` file**

   Create a `.env` file in the root of the client directory and add the following:

```bash
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_API_BASE_URL=https://your-backend-url.com
```
5. **Start the Development Server**

   Run the following command to start the development server.

   ```bash
   npm start
   ```
   The app will start at `http://localhost:3000`

## Environment Variables

- `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
- `REACT_APP_API_BASE_URL`: The base URL for the backend API.

### Project Structure

```bash
client
│
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   ├── context
│   ├── pages
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── ...
```

- `public`: Contains the static files.
- `src/components`: React components used throughout the app.
- `src/context`: Contains the context providers and hooks.
- `src/container`: Different pages (e.g., Home).
- `src/App.js`: The main App component.
- `src/index.js`: The entry point for the React app.

## Google OAuth Integration

Wrap your application with `GoogleOAuthProvider`:

```jsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider>;
```

Use `<GoogleLogin />` in Login Component :

**Sign In With Google**
```jsx
import { GoogleLogin } from '@react-oauth/google';

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
```
Once a user successfully logs in, their profile information is passed to the backend.

## Animations

The app uses **Framer Motion** for smooth animations, including page transitions and component entry animations.

### Example of a Simple Animation

```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  <YourComponent />
</motion.div>
```

## Styling

**Tailwind CSS** is used for styling. You can add styles by using the utility classes provided by Tailwind directly in your JSX.

**Example**
```jsx
<div className="bg-gray-800 text-white p-4 rounded-lg">
  This is a styled component.
</div>
```

## Deployment
The frontend is deployed using **Vercel**. Follow these steps to deploy:

- Push your changes to GitHub.
- Connect your GitHub repository to [Vercel](https://vercel.com).
- Vercel will handle the build and deployment process automatically.

## License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions to this project. If you want to contribute, please follow these guidelines:

-  Fork the repository.
- Create a new branch for your changes.
- Make your changes and test thoroughly.
- Submit a pull request with a description of your changes.

## Contact

If you have any questions or need further assistance, feel free to reach out:

- Email: chnvdprashanth@gmail.com
- GitHub: [chnvdprashanth](https://github.com/chnvdprashanth)

## Acknowledgements

- [React](https://reactjs.org/) - The JavaScript library used for building the frontend.
- [Cloudinary](https://cloudinary.com/) - Image management and hosting service.
- [Google OAuth](https://developers.google.com/identity) - Authentication service.
