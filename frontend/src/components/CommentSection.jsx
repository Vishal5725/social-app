import { useState } from "react";

import {
    Box,
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        const success = await onComment(
            postId,
            commentText
        );

        if (success) {
            setCommentText("");
        }
    };

    return (
        <>
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

            {isLoggedIn && (
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        gap: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(event) =>
                            setCommentText(event.target.value)
                        }
                    />

                    <IconButton
                        type="submit"
                        disabled={!commentText.trim()}
                    >
                        <Send />
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default CommentSection;