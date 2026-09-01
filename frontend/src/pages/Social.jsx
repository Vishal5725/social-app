import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Typography,
    Card,
    CardContent,
    Button
} from "@mui/material";

import API from "../services/api";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Social = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [creatingPost, setCreatingPost] = useState(false);

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("user") || "null"
            );
        } catch {
            return null;
        }
    });

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );

    const [authChecking, setAuthChecking] = useState(
        Boolean(localStorage.getItem("token"))
    );
    // =========================
    // FETCH POSTS
    // =========================

    const fetchPosts = async (
        pageNumber = 1,
        loadMore = false
    ) => {
        try {
            if (loadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }

            setError("");

            const response = await API.get(
                `/posts?page=${pageNumber}&limit=5`
            );

            const newPosts = response.data.posts || [];

            if (loadMore) {
                setPosts((currentPosts) => [
                    ...currentPosts,
                    ...newPosts,
                ]);
            } else {
                setPosts(newPosts);
            }

            setPage(pageNumber);

            setHasNextPage(
                response.data.pagination?.hasNextPage || false
            );

        } catch (error) {
            console.error(
                "Fetch posts error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load posts"
            );

        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!hasNextPage || loadingMore) {
            return;
        }

        fetchPosts(page + 1, true);
    };
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");

            // Guest user
            if (!token) {
                setAuthChecking(false);
                return;
            }

            try {
                const response = await API.get("/auth/me");

                setUser(response.data.user);
                setIsLoggedIn(true);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            } catch (error) {
                console.error(
                    "Authentication verification failed:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setAuthChecking(false);
            }
        };

        verifyUser();
    }, []);
    useEffect(() => {
        fetchPosts(1);
    }, []);

    // =========================
    // CREATE POST
    // =========================

    const handleCreatePost = async (event) => {
        event.preventDefault();

        if (!text.trim() && !image) {
            setError(
                "Please add text or an image"
            );
            return;
        }

        try {
            setCreatingPost(true);
            setError("");

            const formData = new FormData();

            if (text.trim()) {
                formData.append(
                    "text",
                    text.trim()
                );
            }

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            const response = await API.post(
                "/posts",
                formData
            );

            setPosts((currentPosts) => [
                response.data.post,
                ...currentPosts,
            ]);

            setText("");
            setImage(null);

            event.target.reset();

        } catch (error) {
            console.error(
                "Create post error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create post"
            );
        } finally {
            setCreatingPost(false);
        }
    };

    // =========================
    // LIKE / UNLIKE
    // =========================

    const handleLike = async (postId) => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        try {
            const response = await API.post(
                `/posts/${postId}/like`
            );

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            likes:
                                response.data.likes,
                        }
                        : post
                )
            );
        } catch (error) {
            console.error(
                "Like error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to like post"
            );
        }
    };

    // =========================
    // ADD COMMENT
    // =========================

    const handleComment = async (
        postId,
        commentText
    ) => {
        if (!isLoggedIn) {
            navigate("/login");
            return false;
        }

        if (!commentText.trim()) {
            return false;
        }

        try {
            const response = await API.post(
                `/posts/${postId}/comments`,
                {
                    text: commentText.trim(),
                }
            );

            setPosts((currentPosts) =>
                currentPosts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            comments: [
                                ...post.comments,
                                response.data.comment,
                            ],
                        }
                        : post
                )
            );

            return true;

        } catch (error) {
            console.error(
                "Comment error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to add comment"
            );

            return false;
        }
    };

    // =========================
    // LOGOUT
    // =========================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    // =========================
    // LOADING
    // =========================

    if (loading || authChecking) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // =========================
    // UI
    // =========================

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        > <Navbar
                user={user}
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                onLogin={() => navigate("/login")}
            />

            <Container
                maxWidth="md"
                sx={{
                    pb: 6,
                }}
            >

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        onClose={() =>
                            setError("")
                        }
                    >
                        {error}
                    </Alert>
                )}

                {isLoggedIn && (
                    <CreatePost
                        text={text}
                        setText={setText}
                        image={image}
                        setImage={setImage}
                        creatingPost={creatingPost}
                        onSubmit={handleCreatePost}
                    />
                )}

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                >
                    Latest Posts
                </Typography>

                {posts.length === 0 ? (
                    <Card
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent>
                            <Typography
                                textAlign="center"
                                color="text.secondary"
                            >
                                No posts yet.
                                Be the first to post!
                            </Typography>
                        </CardContent>
                    </Card>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onLike={handleLike}
                            onComment={handleComment}
                            isLoggedIn={isLoggedIn}
                            currentUser={user}
                        />
                    ))
                )}
                {hasNextPage && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3,
                            mb: 4,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore
                                ? "Loading..."
                                : "Load More"}
                        </Button>
                    </Box>
                )}

            </Container>
        </Box>
    );
};

export default Social;