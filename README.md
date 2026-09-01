# Social App – Full Stack Internship Assignment

The application allows users to create accounts, authenticate with email and password, create text/image posts, view a public social feed, like posts, comment on posts, and interact with the feed through a responsive React interface.

## Live Application

- **Frontend:** https://social-app-tau-flax.vercel.app/
- **Backend API:** https://social-app-pshd.onrender.com
- **GitHub:** https://github.com/Vishal5725/social-app

## Features

### Authentication
- User signup with username, email and password
- User login using JWT authentication
- Protected actions for authenticated users
- Authentication validation when the application loads
- Logout functionality

### Social Feed
- Public feed accessible to logged-in and guest users
- Posts displayed in newest-first order
- Username, post content, likes and comments displayed
- Pagination / Load More support

### Posts
- Create a text-only post
- Create an image-only post
- Create a post containing both text and an image
- Image uploads handled through Cloudinary
- Post creation loading state
- Input validation

### Likes
- Like and unlike posts
- Display total like count
- Like state updates immediately in the UI
- Favorite icon changes according to the current user's like state

### Comments
- Add comments to posts
- Display comments and comment count
- Store the commenting user's information
- Prevent duplicate submissions while the comment API request is running
- Loading indicator while a comment is being submitted

### Image Preview
- Post images can be opened in a modal
- Fade animation for the image modal
- Close button to exit the modal
- Helps display images without cropping the feed layout

## Tech Stack

### Frontend
- React.js
- Vite
- Material UI (MUI)
- Axios
- React Router
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS
- dotenv

### Database & Services
- MongoDB Atlas
- Cloudinary
- Render
- Vercel

## Project Structure

```text
social-app/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── postController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Post.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── CommentSection.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── PostCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Social.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
└── DOCUMENTATION.md
```

## Folder & File Description

### `backend/`

Contains the Node.js + Express REST API.

#### `backend/config/`

- `db.js` – MongoDB/Mongoose database connection.
- `cloudinary.js` – Cloudinary configuration used for image uploads.

#### `backend/controllers/`

- `authController.js` – Signup, login and authentication-related logic.
- `postController.js` – Create posts, fetch feed, likes and comments.

#### `backend/middleware/`

- `authMiddleware.js` – Verifies JWT authentication and validates the authenticated user.
- `uploadMiddleware.js` – Handles multipart/form-data image uploads using Multer.

#### `backend/models/`

- `User.js` – Defines the user MongoDB schema.
- `Post.js` – Defines the post schema, including embedded likes and comments.

The application uses the required two main MongoDB collections:
- Users
- Posts

Likes and comments are stored within post documents rather than separate collections.

#### `backend/routes/`

- `authRoutes.js` – Authentication API endpoints.
- `postRoutes.js` – Post, like and comment API endpoints.

#### `backend/server.js`

Entry point for the Express server. It configures middleware, routes, database connection and starts the API server.

#### `backend/.env`

Contains private backend configuration such as:
- MongoDB connection string
- JWT secret
- Cloudinary credentials
- Other backend environment values

---

### `frontend/`

Contains the React + Vite client application.

#### `frontend/src/components/`

Reusable UI components.

- `Navbar.jsx` – Application header, user information, login and logout controls.
- `CreatePost.jsx` – Form for creating text/image posts.
- `PostCard.jsx` – Displays an individual post, image, likes and actions.
- `CommentSection.jsx` – Displays comments and provides the comment input/submission UI.

#### `frontend/src/pages/`

Application-level pages.

- `Login.jsx` – User login page.
- `Signup.jsx` – User registration page.
- `Social.jsx` – Main social feed page and feed interaction logic.

#### `frontend/src/services/`

- `api.js` – Central Axios API client and authentication token handling.

#### `frontend/src/App.jsx`

Defines the main React application routing and page structure.

#### `frontend/src/main.jsx`

React application entry point.

#### `frontend/src/index.css`

Global styling and basic application layout styles.

#### `frontend/.env`

Contains the frontend API base URL for local development.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For the production Vercel deployment, configure the environment variable in Vercel as:

```env
VITE_API_URL=https://social-app-pshd.onrender.com/api
```

## API Overview

### Authentication

```text
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

### Posts

```text
GET  /api/posts
POST /api/posts
```

### Likes

```text
POST /api/posts/:postId/like
```

### Comments

```text
POST /api/posts/:postId/comment
```

> Exact endpoint names should be checked against the current route files before changing the API.

## Environment Variables

### Backend

Typical backend variables used by the project include:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

Production:

```env
VITE_API_URL=https://social-app-pshd.onrender.com/api
```

Never commit secrets or credentials.

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs locally at:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local frontend URL, normally:

```text
http://localhost:5173
```

## Deployment

### Backend – Render

The backend is deployed on Render.

Production API:

```text
https://social-app-pshd.onrender.com
```

Render environment variables must contain the required MongoDB, JWT and Cloudinary configuration.

### Frontend – Vercel

The frontend is deployed on Vercel.

The Vercel project should use:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Production environment variable:

```text
VITE_API_URL=https://social-app-pshd.onrender.com/api
```

### Database – MongoDB Atlas

MongoDB Atlas is used as the production database.

The application keeps the data model limited to the two required collections:
- Users
- Posts

## Security & Configuration Notes

- Passwords are hashed using bcryptjs.
- JWT is used for authenticated API requests.
- JWT is sent through the `Authorization: Bearer <token>` header.
- Private credentials are stored in environment variables.
- `.env` files are excluded from Git.
- Cloudinary credentials are kept on the backend.
- Frontend public environment variables contain only values intended for browser use.

## Author

**Vishal Gupta**

GitHub: https://github.com/Vishal5725
