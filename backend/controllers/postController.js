const Post = require("../models/Post");
const User = require("../models/User");


// =========================
// CREATE POST
// =========================
const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    const image = req.file ? req.file.path : "";

    // At least text or image is required
    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "Post must contain text or image",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const post = await Post.create({
      userId: user._id,
      username: user.username,
      text: text?.trim() || "",
      image: image || "",
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    console.error("Create post error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// GET FEED WITH PAGINATION
// =========================
const getPosts = async (req, res) => {
  try {
    const page = Math.max(
      parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      parseInt(req.query.limit) || 5,
      20
    );

    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Post.countDocuments(),
    ]);

    const totalPages = Math.ceil(
      totalPosts / limit
    );

    return res.status(200).json({
      posts,
      pagination: {
        currentPage: page,
        limit,
        totalPosts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });

  } catch (error) {
    console.error(
      "Get posts error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};
// =========================
// LIKE / UNLIKE POST
// =========================
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (like) => like.userId.toString() === user._id.toString()
    );

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== user._id.toString()
      );
    } else {
      // Like
      post.likes.push({
        userId: user._id,
        username: user.username,
      });
    }

    await post.save();

    return res.status(200).json({
      message: alreadyLiked
        ? "Post unliked successfully"
        : "Post liked successfully",
      likes: post.likes,
      likesCount: post.likes.length,
    });

  } catch (error) {
    console.error("Like error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// ADD COMMENT
// =========================
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    post.comments.push({
      userId: user._id,
      username: user.username,
      text: text.trim(),
    });

    await post.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: post.comments[post.comments.length - 1],
      commentsCount: post.comments.length,
    });

  } catch (error) {
    console.error("Comment error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  toggleLike,
  addComment,
};

