# Social App – Project Documentation

## 1. Project Overview

The application provides a simple social feed where users can register and log in, create text or image posts, view posts from all users, like posts and comment on posts.

The feed is publicly viewable, while post creation and social interactions are available to authenticated users.

---

## 2. Technology Stack

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
- JSON Web Token (JWT)
- bcryptjs
- Multer
- CORS
- dotenv

### External Services

- MongoDB Atlas – database
- Cloudinary – image storage
- Render – backend hosting
- Vercel – frontend hosting

---

## 3. Folder Structure

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

---

## 4. Backend Documentation

### `backend/config/db.js`

Responsible for establishing the connection between the Node.js application and MongoDB Atlas through Mongoose.

### `backend/config/cloudinary.js`

Configures Cloudinary for storing uploaded post images.

### `backend/controllers/authController.js`

Contains authentication-related business logic:

- User signup
- Password hashing
- User login
- JWT generation
- Current-user authentication/validation

### `backend/controllers/postController.js`

Contains social-feed business logic:

- Create posts
- Fetch posts
- Pagination
- Like/unlike posts
- Add comments

### `backend/middleware/authMiddleware.js`

Protects authenticated endpoints.

The middleware:
1. Reads the JWT from the Authorization header.
2. Verifies the token.
3. Checks that the referenced user still exists.
4. Adds authenticated user information to the request.

### `backend/middleware/uploadMiddleware.js`

Handles image upload requests using Multer before the image is processed by the post controller.

### `backend/models/User.js`

Defines the MongoDB user schema.

It stores user information required for authentication and displaying the user in the social feed.

### `backend/models/Post.js`

Defines the post schema.

A post can contain:
- Text
- Image URL
- Post author/user ID
- Likes
- Comments
- Timestamps

Likes and comments are embedded in post documents.

### `backend/routes/authRoutes.js`

Defines authentication-related API routes.

### `backend/routes/postRoutes.js`

Defines post, like and comment API routes.

### `backend/server.js`

Initializes Express, registers middleware and routes, connects to MongoDB, and starts the backend server.

---

## 5. Frontend Documentation

### `frontend/src/pages/Login.jsx`

Provides the login form.

The user submits email and password to the backend and receives authentication information after successful login.

### `frontend/src/pages/Signup.jsx`

Provides the account creation form.

### `frontend/src/pages/Social.jsx`

Main social feed page.

Responsibilities include:
- Loading posts
- Public feed display
- Authentication state
- Creating posts
- Likes
- Comments
- Pagination
- Logout
- Current-user validation

### `frontend/src/components/Navbar.jsx`

Reusable application navigation/header.

It displays:
- Social Feed title
- Logged-in username or guest state
- Login button for guests
- Logout button for authenticated users

### `frontend/src/components/CreatePost.jsx`

Reusable post creation form supporting:
- Text
- Image
- Text + image
- Loading state
- Submission validation

### `frontend/src/components/PostCard.jsx`

Reusable component for rendering individual posts.

It displays:
- Author
- Post text
- Image
- Like button
- Like count
- Comment section/count

Post images can be opened in an image modal.

### `frontend/src/components/CommentSection.jsx`

Handles:
- Existing comments
- Comment input
- Comment submission
- Submission loading state
- Preventing duplicate comment requests

### `frontend/src/services/api.js`

Central Axios configuration.

It:
- Uses the configured API base URL.
- Adds the JWT token to authenticated requests.
- Handles authentication failures.

### `frontend/src/App.jsx`

Configures frontend routes and the main application structure.

### `frontend/src/main.jsx`

React entry point.

### `frontend/src/index.css`

Global CSS used by the application.

---

## 6. Application Flow

### New User

```text
Signup
  ↓
User stored in MongoDB
  ↓
Login
  ↓
JWT generated
  ↓
Token stored by frontend
  ↓
Social Feed
```

### Existing User

```text
Login
  ↓
JWT authentication
  ↓
Social Feed
  ↓
Create / Like / Comment
```

### Guest User

```text
Open /social
  ↓
Public GET posts
  ↓
View all posts
  ↓
Login required for authenticated actions
```

---

## 7. Post Creation Flow

```text
User selects text/image
        ↓
Frontend validates input
        ↓
FormData created
        ↓
POST /api/posts
        ↓
JWT authentication
        ↓
Multer processes image
        ↓
Cloudinary stores image
        ↓
Post stored in MongoDB
        ↓
Created post returned
        ↓
Frontend updates feed immediately
```

A post can contain:
- Text only
- Image only
- Both text and image

At least one of text or image is required.

---

## 8. Like Flow

```text
User clicks Like
       ↓
POST /api/posts/:postId/like
       ↓
JWT authentication
       ↓
Backend checks existing like
       ↓
Like added or removed
       ↓
Updated likes returned
       ↓
Frontend updates like state
```

The UI shows the total number of likes and changes the favorite icon according to whether the current user has liked the post.

---

## 9. Comment Flow

```text
User writes comment
       ↓
Click Send
       ↓
Send button disabled
       ↓
Loading indicator displayed
       ↓
POST comment API
       ↓
Backend saves comment
       ↓
Response received
       ↓
Frontend updates comments
       ↓
Input cleared
       ↓
Send button enabled
```

The loading state prevents accidental duplicate comment submissions.

---

## 10. Pagination

The feed supports pagination / Load More functionality.

The backend returns posts in pages, ordered by creation time.

The frontend:
1. Loads the first page.
2. Displays the returned posts.
3. Loads the next page when requested.
4. Appends new posts instead of replacing existing posts.
5. Stops when there are no more posts.

---

## 11. Image Modal

Post images are displayed inside the feed while maintaining a controlled layout.

When a user clicks an image:

```text
Image click
    ↓
Modal opens
    ↓
Fade animation
    ↓
Full image preview
    ↓
Close button
    ↓
Modal closes
```

This prevents large images from being permanently cropped inside the post card.

---

## 12. Authentication Validation

The application does not treat the existence of a local JWT as permanent proof that a user still exists.

When a logged-in user loads the social page:

```text
Stored JWT
   ↓
GET /api/auth/me
   ↓
JWT verified
   ↓
User checked in MongoDB
   ↓
User exists → remain logged in
User missing → clear authentication and return to guest/login state
```

This also handles expired or invalid tokens.

---

## 13. Database Design

We have only two MongoDB collections.

### Users Collection

Stores registered user accounts.

Conceptually:

```text
users
├── _id
├── username
├── email
├── password
└── timestamps
```

Passwords are stored as hashes rather than plain text.

### Posts Collection

Conceptually:

```text
posts
├── _id
├── userId
├── username
├── text
├── imageUrl
├── likes[]
│   ├── userId
│   └── username
├── comments[]
│   ├── userId
│   ├── username
│   └── text
└── timestamps
```

Likes and comments remain embedded inside posts, keeping the implementation within the assignment's two-collection requirement.

---

## 14. Environment Configuration

### Local Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Production Frontend

```env
VITE_API_URL=https://social-app-pshd.onrender.com/api
```

### Backend

The backend requires environment variables for MongoDB, JWT and Cloudinary configuration.

Example:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

---

## 15. Deployment Architecture

```text
                 User Browser
                      │
                      ▼
              ┌───────────────┐
              │    Vercel     │
              │ React + Vite  │
              └───────┬───────┘
                      │
                   HTTPS API
                      │
                      ▼
              ┌───────────────┐
              │    Render     │
              │ Node/Express  │
              └───────┬───────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
       MongoDB Atlas       Cloudinary
         Database          Image Storage
```

### Production URLs

```text
Frontend:
https://social-app-pshd.vercel.app

Backend:
https://social-app-pshd.onrender.com
```


## 16. Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend communicates with the backend through `VITE_API_URL`.

---

## 17. Testing Checklist

### Authentication

- [x] Signup
- [x] Login
- [x] Logout
- [x] JWT protected requests
- [x] Current-user validation

### Feed

- [x] Public feed
- [x] Multiple users' posts
- [x] Username display
- [x] Likes count
- [x] Comments count
- [x] Pagination

### Posts

- [x] Text post
- [x] Image post
- [x] Text + image post
- [x] Image preview modal

### Social Interactions

- [x] Like
- [x] Unlike
- [x] Comment
- [x] Comment loading state
- [x] Duplicate submission prevention

### Deployment

- [x] GitHub repository
- [x] Vercel frontend
- [x] Render backend
- [x] MongoDB Atlas
- [x] Production API configuration

---

## 18. Repository

GitHub:

https://github.com/Vishal5725/social-app

## 20. Author

**Vishal Gupta**

GitHub:

https://github.com/Vishal5725
