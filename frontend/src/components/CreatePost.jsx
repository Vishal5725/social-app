import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";

import {
    AddPhotoAlternate,
    Close,
    Send,
} from "@mui/icons-material";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const CreatePost = ({
    text,
    setText,
    image,
    setImage,
    creatingPost,
    onSubmit,
}) => {
    const [imageError, setImageError] = useState("");

    const handleImageChange = (event) => {
        const selectedImage = event.target.files?.[0];

        if (!selectedImage) {
            return;
        }

        if (selectedImage.size > MAX_IMAGE_SIZE) {
            setImageError(
                "Image must be smaller than 5 MB."
            );
            setImage(null);
            event.target.value = "";
            return;
        }

        if (!selectedImage.type.startsWith("image/")) {
            setImageError(
                "Please select a valid image."
            );
            setImage(null);
            event.target.value = "";
            return;
        }

        setImageError("");
        setImage(selectedImage);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageError("");
    };

    return (
        <Card
            elevation={0}
            sx={{
                mb: 4,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "white",
            }}
        >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                    }}
                >
                    <AddPhotoAlternate color="primary" />

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Create a Post
                    </Typography>
                </Box>

                <Box
                    component="form"
                    onSubmit={onSubmit}
                >
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={8}
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)
                        }
                        disabled={creatingPost}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />

                    {imageError && (
                        <Typography
                            color="error"
                            variant="body2"
                            sx={{ mt: 1 }}
                        >
                            {imageError}
                        </Typography>
                    )}

                    {image && (
                        <Box
                            sx={{
                                position: "relative",
                                mt: 2,
                                borderRadius: 2,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Box
                                component="img"
                                src={URL.createObjectURL(image)}
                                alt="Selected post"
                                sx={{
                                    width: "100%",
                                    maxHeight: 350,
                                    objectFit: "cover",
                                }}
                            />

                            <IconButton
                                onClick={handleRemoveImage}
                                disabled={creatingPost}
                                aria-label="Remove image"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    backgroundColor:
                                        "rgba(255,255,255,0.9)",
                                    "&:hover": {
                                        backgroundColor: "white",
                                    },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "stretch",
                                sm: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                            gap: 2,
                            mt: 2,
                        }}
                    >
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<AddPhotoAlternate />}
                            disabled={creatingPost}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },
                            }}
                        >
                            {image
                                ? "Change Image"
                                : "Add Image"}

                            <input
                                hidden
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                            />
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<Send />}
                            disabled={
                                creatingPost ||
                                (!text.trim() && !image)
                            }
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                                px: 3,
                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },
                            }}
                        >
                            {creatingPost
                                ? "Posting..."
                                : "Post"}
                        </Button>
                    </Box>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                            display: "block",
                            mt: 1.5,
                        }}
                    >
                        You can share text, an image, or both.
                        Maximum image size: 5 MB.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CreatePost;