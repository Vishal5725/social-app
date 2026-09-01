import {
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    Logout,
    Public,
} from "@mui/icons-material";

const Navbar = ({
    user,
    isLoggedIn,
    onLogout,
    onLogin,
}) => {
    return (
        <Box
            component="header"
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderBottom: "1px solid",
                borderColor: "divider",
                mb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        minHeight: 72,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    {/* Brand */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: 2.5,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                    "linear-gradient(135deg, #1976d2, #7b1fa2)",
                                color: "white",
                            }}
                        >
                            <Public />
                        </Box>

                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={800}
                                sx={{
                                    lineHeight: 1.1,
                                }}
                            >
                                SocialApp
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Connect & share
                            </Typography>
                        </Box>
                    </Box>

                    {/* User / Login */}

                    {isLoggedIn ? (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 38,
                                    height: 38,
                                    fontSize: 15,
                                    fontWeight: 700,
                                }}
                            >
                                {user?.username
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </Avatar>

                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "block",
                                    },
                                    mr: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                >
                                    {user?.username}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    @{user?.username}
                                </Typography>
                            </Box>

                            <Tooltip title="Logout">
                                <IconButton
                                    onClick={onLogout}
                                    aria-label="Logout"
                                    sx={{
                                        ml: 0.5,
                                    }}
                                >
                                    <Logout />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={onLogin}
                            sx={{
                                px: 2.5,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default Navbar;