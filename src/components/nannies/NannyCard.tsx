import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
  Button,
  Chip,
  Divider,
  Collapse,
  alpha,
} from "@mui/material";
import { Star, Place, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import AppointmentModal from "./AppointmentModal";
import type { Nanny } from "../../lib/type/nannies";

interface Props {
  nanny: Nanny;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isPriority?: boolean;
}

const NannyCard: React.FC<Props> = ({
  nanny,
  isFavorite,
  onToggleFavorite,
  isPriority = false,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showAppointment, setShowAppointment] = React.useState(false);
  const {
    state: { user },
    setAuthModal,
  } = useAuth();

  const handleMakeAppointment = () => {
    if (!user) {
      setAuthModal("login");
      return;
    }
    setShowAppointment(true);
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(nanny.birthday);

  return (
    <Paper
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: "24px",
        bgcolor: "white",
        mb: 4,
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, sm: 3 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Box
          sx={{
            width: { xs: 100, sm: 120 },
            height: { xs: 100, sm: 120 },
            borderRadius: "30px",
            border: (theme) =>
              `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            p: "10px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={nanny.avatar_url}
            alt={nanny.name}
            imgProps={{ 
              loading: isPriority ? "eager" : "lazy",
              // @ts-expect-error - fetchpriority is not yet in React types but is supported by modern browsers
              fetchpriority: isPriority ? "high" : "auto",
              decoding: "async"
            }}
            sx={{ width: "100%", height: "100%", borderRadius: "15px" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 14,
              height: 14,
              bgcolor: "#38CD3E",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-start" },
            mb: 2,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "rgba(0,0,0,0.5)",
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              NANNY
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mt: 0.5,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
              }}
            >
              {nanny.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row" },
              flexWrap: "wrap",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Place sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2">{nanny.location}</Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 16,
                my: "auto",
                display: { xs: "none", lg: "block" },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Star sx={{ fontSize: 18, color: "#FFC107" }} />
              <Typography variant="body2">Rating: {nanny.rating}</Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                height: 16,
                my: "auto",
                display: { xs: "none", lg: "block" },
              }}
            />
            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
              Price / 1 hour:{" "}
              <Box component="span" sx={{ color: "#38CD3E", fontWeight: 700 }}>
                {nanny.price_per_hour}$
              </Box>
            </Typography>

            <IconButton
              onClick={() => {
                if (!user) {
                  setAuthModal("login");
                } else {
                  onToggleFavorite();
                }
              }}
              aria-label={isFavorite ? "Remove from favorite" : "Add to favorite"}
              sx={{
                ml: { xs: "auto", sm: 1 },
                bgcolor: { xs: "rgba(0,0,0,0.03)", sm: "transparent" },
                "&:hover": {
                  bgcolor: { xs: "rgba(0,0,0,0.06)", sm: "rgba(0,0,0,0.04)" },
                },
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ color: "primary.main" }} />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          <Chip
            label={`Age: ${age}`}
            sx={{ bgcolor: "#F3F3F3", fontWeight: 500 }}
          />
          <Chip
            label={`Experience: ${nanny.experience}`}
            sx={{ bgcolor: "#F3F3F3", fontWeight: 500 }}
          />
          <Chip
            label={`Kids age: ${nanny.kids_age}`}
            sx={{ bgcolor: "#F3F3F3", fontWeight: 500 }}
          />
          <Chip
            label={`Characters: ${nanny.characters.join(", ")}`}
            sx={{ bgcolor: "#F3F3F3", fontWeight: 500 }}
          />
          <Chip
            label={`Education: ${nanny.education}`}
            sx={{ bgcolor: "#F3F3F3", fontWeight: 500 }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{ color: "rgba(0,0,0,0.5)", mb: 2, lineHeight: 1.6 }}
        >
          {nanny.about}
        </Typography>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less details" : "Read more about nanny"}
          sx={{
            p: 0,
            color: "black",
            fontWeight: 700,
            textDecoration: "underline",
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 4 }}>
            {nanny.reviews.map((review, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                  <Avatar
                    alt={review.reviewer}
                    sx={{
                      bgcolor: "rgba(0,0,0,0.05)",
                      color: "primary.main",
                      fontWeight: 700,
                    }}
                  >
                    {review.reviewer[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {review.reviewer}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Star sx={{ fontSize: 14, color: "#FFC107" }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {review.rating}.0
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(0,0,0,0.5)", pl: 7 }}
                >
                  {review.comment}
                </Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              onClick={handleMakeAppointment}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
              }}
            >
              Make an appointment
            </Button>
          </Box>
        </Collapse>
      </Box>

      {showAppointment && (
        <AppointmentModal
          nanny={nanny}
          onClose={() => setShowAppointment(false)}
        />
      )}
    </Paper>
  );
};

export default React.memo(NannyCard);
