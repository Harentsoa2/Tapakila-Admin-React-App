import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Modal, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { CalendarToday, LocationOn, Person, Category, Close } from "@mui/icons-material";

export const EventCard = ({ event, isPastEvent = false }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
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
            backgroundColor: isPastEvent ? "#f5f5f5" : "#ffffff",
            position: 'relative',
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          {isPastEvent && (
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              PASSÉ
            </Box>
          )}

          <CardMedia
            component="img"
            height="200"
            image={event.event_image}
            alt={event.event_name}
            sx={{
              objectFit: "cover",
              filter: isPastEvent ? 'grayscale(30%)' : 'none',
              opacity: isPastEvent ? 0.8 : 1,
            }}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                color: isPastEvent ? "#757575" : "#2e7d32",
                textAlign: "center",
                mb: 2,
              }}
            >
              {event.event_name}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  backgroundColor: isPastEvent ? "#757575" : "#2e7d32",
                  color: "#fff",
                  borderRadius: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: isPastEvent ? "#616161" : "#1b5e20",
                  },
                }}
              >
                Voir les détails
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* pour les details de l'evenement cliqué */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          overflowY: 'auto',
        }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 3, color: isPastEvent ? "#757575" : "#2e7d32" }}>
            {event.event_name}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <CardMedia
                component="img"
                height="300"
                image={event.event_image}
                alt={event.event_name}
                sx={{
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 2,
                }}
              />
            </Box>

            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Description</Typography>
              <Typography paragraph sx={{ mb: 3 }}>{event.event_description}</Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn fontSize="small" sx={{ color: "#d32f2f" }} />
                  <Box>
                    <Typography variant="subtitle2">Lieu</Typography>
                    <Typography variant="body1">{event.event_place}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday fontSize="small" sx={{ color: "#1976d2" }} />
                  <Box>
                    <Typography variant="subtitle2">Date</Typography>
                    <Typography variant="body1">
                      {new Date(event.event_date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person fontSize="small" sx={{ color: "#ffa000" }} />
                  <Box>
                    <Typography variant="subtitle2">Organisateur</Typography>
                    <Typography variant="body1">{event.event_organizer}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Category fontSize="small" sx={{ color: "#7b1fa2" }} />
                  <Box>
                    <Typography variant="subtitle2">Catégorie</Typography>
                    <Typography variant="body1">{event.event_category}</Typography>
                  </Box>
                </Box>
              </Box>

              {event.additional_info && (
                <>
                  <Typography variant="h6" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>Informations supplémentaires</Typography>
                  <Typography paragraph>{event.additional_info}</Typography>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
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
              disabled={isPastEvent}
            >
              {isPastEvent ? "Événement terminé" : "Tickets disponibles"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
