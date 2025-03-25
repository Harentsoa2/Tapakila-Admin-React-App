import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { CalendarToday, LocationOn, Person, Category } from "@mui/icons-material";

export const EventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card
        sx={{
          maxWidth: 360,
          margin: 2,
          boxShadow: 3,
          borderRadius: 1,
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          backgroundColor: "#ffffff",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={event.event_image}
          alt={event.event_name}
          sx={{
            objectFit: "cover",
          }}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#2e7d32",
              textAlign: "center",
              mb: 2,
            }}
          >
            {event.event_name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 2,
              textAlign: "center",
              fontStyle: "italic",
              color: "#424242",
            }}
          >
            {event.event_description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn fontSize="small" sx={{ color: "#d32f2f" }} />
              <Typography variant="body2" sx={{ color: "#212121" }}>
                {event.event_place}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday fontSize="small" sx={{ color: "#1976d2" }} />
              <Typography variant="body2" sx={{ color: "#212121" }}>
                {new Date(event.event_date).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person fontSize="small" sx={{ color: "#ffa000" }} />
              <Typography variant="body2" sx={{ color: "#212121" }}>
                {event.event_organizer}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Category fontSize="small" sx={{ color: "#7b1fa2" }} />
              <Typography variant="body2" sx={{ color: "#212121" }}>
                {event.event_category}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2e7d32",
                color: "#fff",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              Voir les tickets
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
