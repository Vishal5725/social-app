const express = require("express");

const {
  createPost,
  getPosts,
  toggleLike,
  addComment,
} = require("../controllers/postController");

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create post
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

// Public feed
router.get(
  "/",
  getPosts
);

// Like / Unlike
router.post(
  "/:id/like",
  authMiddleware,
  toggleLike
);

// Add comment
router.post(
  "/:id/comments",
  authMiddleware,
  addComment
);

module.exports = router;