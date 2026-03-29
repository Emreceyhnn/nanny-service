import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import bgImage from "../../assets/bg.webp";
import { motion } from "framer-motion";
import { ArrowOutward, Check } from "@mui/icons-material";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Container sx={{ minWidth: "100vw" }} disableGutters>
        <Box
          sx={{
            overflow: "hidden",
            bgcolor: "white",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              flex: { xs: "1", md: "0.45" },
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: { xs: 4, md: "96px" },
              pr: { xs: 4, md: 4 },
              pt: { xs: 12, md: "120px" },
              pb: "64px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", md: "72px" },
                  lineHeight: "76px",
                  mb: 4,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  maxWidth: 600,
                }}
              >
                Make Life Easier for the Family:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.75rem",
                  mb: 8,
                  maxWidth: 450,
                  lineHeight: 1.2,
                  fontWeight: 500,
                  opacity: 0.95,
                }}
              >
                Find Babysitters Online for All Occasions
              </Typography>

              <Button
                component={Link}
                to="/nannies"
                variant="outlined"
                size="large"
                endIcon={<ArrowOutward />}
                sx={{
                  width: "231px",
                  height: "60px",
                  fontSize: "1.25rem",
                  borderRadius: "30px",
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Get started
              </Button>
            </motion.div>
          </Box>

          <Box
            sx={{
              flex: { xs: "1", md: "0.55" },
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={bgImage}
              alt="Nanny and Child"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(18, 20, 23, 0.6)nav",
                zIndex: 1,
              }}
            />

            <Paper
              elevation={0}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              sx={{
                position: "absolute",
                bottom: 40,
                right: 40,
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: "2rem 2.5rem",
                borderRadius: "20px",
                bgcolor: "white",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 54,
                  height: 54,
                  borderRadius: "12px",
                }}
              >
                <Check sx={{ color: "white" }} />
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.5)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Experienced nannies
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  15,000
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
