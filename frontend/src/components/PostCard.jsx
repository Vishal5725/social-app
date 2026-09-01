import { useState } from "react";

import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    Close,
    Favorite,
    FavoriteBorder,
} from "@mui/icons-material";

import CommentSection from "./CommentSection";

const PostCard = ({
    post,
    onLike,
    onComment,
    isLoggedIn,
    currentUser,
}) => {
    const [imageOpen, setImageOpen] = useState(false);

    const hasLiked = post.likes?.some(
        (like) =>
            String(like.userId) ===
            String(currentUser?.id)
    );

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        const postDate = new Date(date);

        if (Number.isNaN(postDate.getTime())) {
            return "";
        }

        return postDate.toLocaleString([], {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const handleImageOpen = () => {
        setImageOpen(true);
    };

    const handleImageClose = () => {
        setImageOpen(false);
    };

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "white",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                >
                    {/* User information */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 44,
                                height: 44,
                                fontWeight: 700,
                            }}
                        >
                            {post.username
                                ?.charAt(0)
                                .toUpperCase()}
                        </Avatar>

                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                fontWeight={700}
                                sx={{
                                    wordBreak:
                                        "break-word",
                                }}
                            >
                                {post.username}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                @{post.username}

                                {post.createdAt &&
                                    ` • ${formatDate(
                                        post.createdAt
                                    )}`}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Post text */}

                    {post.text && (
                        <Typography
                            sx={{
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                mt: 2,
                                lineHeight: 1.7,
                            }}
                        >
                            {post.text}
                        </Typography>
                    )}
                </CardContent>

                {/* Post image */}

                {post.image && (
                    <Box
                        onClick={handleImageOpen}
                        sx={{
                            cursor: "zoom-in",
                            backgroundColor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={post.image}
                            alt={`Post by ${post.username}`}
                            sx={{
                                width: "100%",
                                maxHeight: {
                                    xs: 350,
                                    sm: 500,
                                },
                                objectFit: "contain",
                                display: "block",
                                transition:
                                    "transform 0.2s ease",
                                "&:hover": {
                                    transform:
                                        "scale(1.01)",
                                },
                            }}
                        />
                    </Box>
                )}

                <CardContent
                    sx={{
                        p: {
                            xs: 2,
                            sm: 3,
                        },
                    }}
                >
                    {/* Like / Comment summary */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                            }}
                        >
                            {isLoggedIn && (
                                <Tooltip
                                    title={
                                        hasLiked
                                            ? "Unlike"
                                            : "Like"
                                    }
                                >
                                    <IconButton
                                        onClick={() =>
                                            onLike(
                                                post._id
                                            )
                                        }
                                        aria-label={
                                            hasLiked
                                                ? "Unlike post"
                                                : "Like post"
                                        }
                                        sx={{
                                            transition:
                                                "transform 0.15s ease",
                                            "&:hover": {
                                                transform:
                                                    "scale(1.1)",
                                            },
                                        }}
                                    >
                                        {hasLiked ? (
                                            <Favorite
                                                sx={{
                                                    color:
                                                        "#e53935",
                                                }}
                                            />
                                        ) : (
                                            <FavoriteBorder />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            )}

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {post.likes?.length ||
                                    0}{" "}
                                Likes
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {post.comments?.length ||
                                0}{" "}
                            Comments
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Comments */}

                    <CommentSection
                        comments={post.comments}
                        isLoggedIn={isLoggedIn}
                        onComment={onComment}
                        postId={post._id}
                    />
                </CardContent>
            </Card>

            {/* Full Image Modal */}

            <Dialog
                open={imageOpen}
                onClose={handleImageClose}
                fullWidth
                maxWidth="lg"
                TransitionProps={{
                    timeout: 250,
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "rgba(20, 20, 20, 0.97)",
                        borderRadius: {
                            xs: 0,
                            sm: 2,
                        },
                        overflow: "hidden",
                        m: {
                            xs: 0,
                            sm: 2,
                        },
                    },
                }}
            >
                <DialogContent
                    sx={{
                        p: 0,
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: {
                            xs: "100vh",
                            sm: "80vh",
                        },
                    }}
                >
                    {/* Close button */}

                    <IconButton
                        onClick={handleImageClose}
                        aria-label="Close image"
                        sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 2,
                            color: "white",
                            backgroundColor:
                                "rgba(0, 0, 0, 0.55)",
                            "&:hover": {
                                backgroundColor:
                                    "rgba(0, 0, 0, 0.75)",
                            },
                        }}
                    >
                        <Close />
                    </IconButton>

                    {/* Full image */}

                    <Box
                        component="img"
                        src={post.image}
                        alt={`Full size post by ${post.username}`}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: {
                                xs: "100vh",
                                sm: "85vh",
                            },
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",

                            animation:
                                "imageFadeIn 250ms ease-out",

                            "@keyframes imageFadeIn": {
                                from: {
                                    opacity: 0,
                                    transform:
                                        "scale(0.97)",
                                },
                                to: {
                                    opacity: 1,
                                    transform:
                                        "scale(1)",
                                },
                            },
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PostCard;