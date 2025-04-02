import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

export const EventCard = ({ event, isPastEvent = false }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        sx={{
          maxWidth: 300,
          margin: 2,
          boxShadow: 2,
          borderRadius: '12px',
          overflow: "hidden",
          transition: "all 0.3s",
          backgroundColor: 'transparent',
          position: 'relative',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={event.event_image}
          alt={event.event_name}
          sx={{
            objectFit: "cover",
            filter: isPastEvent ? 'grayscale(80%)' : 'none',
            opacity: isPastEvent ? 0.6 : 1,
          }}
        />

        <CardContent sx={{ padding: '16px !important' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: isPastEvent ? "text.secondary" : "primary.main",
              textAlign: "center",
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              minHeight: '3.2em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {event.event_name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/events/${event.id}/show`)} // Redirection directe
              sx={{
                borderColor: isPastEvent ? "text.secondary" : "primary.main",
                color: isPastEvent ? "text.secondary" : "primary.main",
                borderRadius: '20px',
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                "&:hover": {
                  backgroundColor: isPastEvent ? 'rgba(0, 0, 0, 0.04)' : 'rgba(46, 125, 50, 0.08)',
                  borderColor: isPastEvent ? "text.secondary" : "primary.main",
                },
              }}
            >
              Voir détails
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
