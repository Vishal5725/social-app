import { useState } from "react";

import {
    Box,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";

import { Send } from "@mui/icons-material";

const CommentSection = ({
    comments,
    isLoggedIn,
    onComment,
    postId,
}) => {
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prevent duplicate requests
        if (
            commentLoading ||
            !commentText.trim()
        ) {
            return;
        }

        try {
            setCommentLoading(true);

            const success = await onComment(
                postId,
                commentText.trim()
            );

            if (success) {
                setCommentText("");
            }
        } catch (error) {
            console.error(
                "Comment submission error:",
                error
            );
        } finally {
            setCommentLoading(false);
        }
    };

    return (
        <>
            {/* Existing comments */}

            {comments?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                    {comments.map((comment, index) => (
                        <Box
                            key={`${comment.userId}-${index}`}
                            sx={{
                                mb: 1.5,
                                backgroundColor: "#f5f5f5",
                                borderRadius: 2,
                                p: 1.5,
                            }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight="bold"
                            >
                                {comment.username}
                            </Typography>

                            <Typography variant="body2">
                                {comment.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Comment input */}

            {isLoggedIn && (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        placeholder={
                            commentLoading
                                ? "Posting comment..."
                                : "Write a comment..."
                        }
                        value={commentText}
                        onChange={(event) =>
                            setCommentText(
                                event.target.value
                            )
                        }
                        disabled={commentLoading}
                    />

                    <IconButton
                        type="submit"
                        disabled={
                            commentLoading ||
                            !commentText.trim()
                        }
                        aria-label="Send comment"
                    >
                        {commentLoading ? (
                            <CircularProgress
                                size={22}
                            />
                        ) : (
                            <Send />
                        )}
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default CommentSection;