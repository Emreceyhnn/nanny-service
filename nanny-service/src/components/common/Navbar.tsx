import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon, Circle } from "@mui/icons-material";
import AuthModal from "../auth/AuthModal";
import toast from "react-hot-toast";
import { useUserAppointments } from "../../hooks/useUserAppointments";
import AppointmentListItem from "./AppointmentListItem";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useAppTheme } from "../../hooks/useAppTheme";

const Navbar: React.FC = () => {
  const {
    state: { user },
    login,
    logout,
    signup,
    authModal,
    setAuthModal,
  } = useAuth();
  const location = useLocation();
  const { color, setColor } = useAppTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const { appointments } = useUserAppointments();

  const isHome = location.pathname === "/";

  const colors: Array<{ name: "red" | "blue" | "green"; value: string }> = [
    { name: "red", value: "#F03F3B" },
    { name: "blue", value: "#38CDFF" },
    { name: "green", value: "#103931" },
  ];

  return (
    <>
      <AppBar
        position={isHome ? "absolute" : "fixed"}
        elevation={0}
        sx={{
          bgcolor: isHome ? "transparent" : "primary.main",
          borderBottomColor: "rgba(251, 251, 251, 0.4)",
          py: 2,
          left: 0,
          right: 0,
          zIndex: 1100,
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Box
            sx={{
              position: "relative",
              px: { xs: 1, sm: 2, md: "96px" },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo - Positioned left-wing style */}
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              sx={{
                fontWeight: 650,
                color: "white",
                textDecoration: "none",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Nanny.Services
            </Typography>

            {/* Middle Nav - Positioned image-wing style */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
                alignItems: "center",
                ml: -30,
              }}
            >
              <NavLink to="/" end style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <Box
                    sx={{
                      position: "relative",
                      color: "white",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "white",
                          }
                        : {},
                    }}
                  >
                    Home
                  </Box>
                )}
              </NavLink>

              <NavLink to="/nannies" style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <Box
                    sx={{
                      position: "relative",
                      color: "white",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -8,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "white",
                          }
                        : {},
                    }}
                  >
                    Nannies
                  </Box>
                )}
              </NavLink>

              {user && (
                <NavLink to="/favorites" style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <Box
                      sx={{
                        position: "relative",
                        color: "white",
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        "&::after": isActive
                          ? {
                              content: '""',
                              position: "absolute",
                              bottom: -8,
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "white",
                            }
                          : {},
                      }}
                    >
                      Favorites
                    </Box>
                  )}
                </NavLink>
              )}
            </Box>

            {/* Right Side - Auth & Theme */}
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {/* Theme Switcher - Visible on MD+ */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, mr: 2 }}>
                {colors.map((c) => (
                  <IconButton
                    key={c.name}
                    size="small"
                    onClick={() => setColor(c.name)}
                    sx={{
                      p: 0.5,
                      border: color === c.name ? "2px solid white" : "none",
                    }}
                  >
                    <Circle sx={{ color: c.value, fontSize: 16 }} />
                  </IconButton>
                ))}
              </Box>

              {user ? (
                <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, alignItems: "center" }}>
                  <Box
                    onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 1, sm: 1.5 },
                      cursor: "pointer",
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      borderRadius: "15px",
                      bgcolor: "rgba(255,255,255,0.1)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                      transition: "all 0.2s",
                    }}
                  >
                    <AccountCircle sx={{ color: "white", fontSize: { xs: 20, sm: 24 } }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        display: { xs: "none", lg: "block" },
                      }}
                    >
                      {user.displayName}
                    </Typography>
                    {appointments.length > 0 && (
                      <Box
                        sx={{
                          bgcolor: "#F03F3B",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                          px: 0.8,
                          borderRadius: "10px",
                          ml: 0.5,
                        }}
                      >
                        {appointments.length}
                      </Box>
                    )}
                  </Box>

                  <Button
                    variant="outlined"
                    onClick={() => logout()}
                    sx={{
                      display: { xs: "none", md: "inline-flex" },
                      color: "white",
                      borderColor: "rgba(255,255,255,0.4)",
                      borderRadius: "30px",
                      px: { xs: 2, sm: 3 },
                      py: 1,
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Log out
                  </Button>

                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                    PaperProps={{
                      sx: {
                        width: { xs: 280, sm: 320 },
                        maxHeight: 500,
                        borderRadius: "24px",
                        mt: 2,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: "1px solid #eee",
                        bgcolor: "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        My Appointments
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        Track your scheduled childcare
                      </Typography>
                    </Box>

                    <Box sx={{ flex: 1, overflowY: "auto", py: 1 }}>
                      {appointments.length === 0 ? (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            You have no appointments yet.
                          </Typography>
                        </Box>
                      ) : (
                        appointments.map((apt) => (
                          <AppointmentListItem key={apt.id} appointment={apt} />
                        ))
                      )}
                    </Box>

                    {/* Mobile/Tablet Only Actions */}
                    <Box
                      sx={{
                        display: { xs: "block", md: "none" },
                        p: 2,
                        borderTop: "1px solid #eee",
                        bgcolor: "rgba(0,0,0,0.02)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          textTransform: "uppercase",
                          color: "text.secondary",
                          mb: 1.5,
                          display: "block",
                        }}
                      >
                        Settings
                      </Typography>
                      
                      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>Theme:</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          {colors.map((c) => (
                            <IconButton
                              key={c.name}
                              size="small"
                              onClick={() => setColor(c.name)}
                              sx={{
                                p: 0.5,
                                border: color === c.name ? `2px solid ${c.value}` : "2px solid transparent",
                              }}
                            >
                              <Circle sx={{ color: c.value, fontSize: 18 }} />
                            </IconButton>
                          ))}
                        </Box>
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => {
                          logout();
                          setUserMenuAnchor(null);
                        }}
                        sx={{ borderRadius: "12px", fontWeight: 600, boxShadow: 'none' }}
                      >
                        Log out
                      </Button>
                    </Box>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setAuthModal("login")}
                    sx={{
                      color: "white",
                      borderColor: "rgba(255,255,255,0.4)",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => setAuthModal("signup")}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "30px",
                      px: 4,
                      py: 1.5,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
                    }}
                  >
                    Registration
                  </Button>
                </Box>
              )}

              <IconButton
                sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { width: 200, borderRadius: "15px", mt: 1.5 } }}
      >
        <MenuItem component={NavLink} to="/" onClick={() => setAnchorEl(null)}>
          Home
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/nannies"
          onClick={() => setAnchorEl(null)}
        >
          Nannies
        </MenuItem>
        {user && (
          <MenuItem
            component={NavLink}
            to="/favorites"
            onClick={() => setAnchorEl(null)}
          >
            Favorites
          </MenuItem>
        )}
      </Menu>

      {authModal && (
        <AuthModal
          type={authModal}
          onClose={() => setAuthModal(null)}
          onSubmit={async (data) => {
            try {
              if (authModal === "signup") {
                const signupData = data as any;
                await signup(signupData.email, signupData.password, signupData.name);
              } else {
                await login(data.email, data.password);
              }
              setAuthModal(null);
            } catch (error) {
              const message =
                error instanceof Error ? error.message : "An error occurred";
              toast.error(message);
            }
          }}
        />
      )}
    </>
  );
};

export default Navbar;
