import { List, useListContext } from "react-admin";
import { Grid, Typography, Box } from "@mui/material";
import { EventCard } from "./EventCard";

export const EventList = () => {
  return (
    <List>
      <EventListContent />
    </List>
  );
};

const EventListContent = () => {
  const { data, isLoading } = useListContext();

  if (isLoading)
    return <div style={{ background: "transparent" }}>Chargement en cours...</div>;

  // Filtrer les evmnents par rapport a la date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = data.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate >= today;
  });

  const pastEvents = data.filter(event => {
    const eventDate = new Date(event.event_date);
    return eventDate < today;
  });

  return (
    <Box sx={{ padding: 2, backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2, color: '#2e7d32' }}>
        Événements à venir
      </Typography>
      {upcomingEvents.length > 0 ? (
        <Grid container spacing={2}>
          {upcomingEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Aucun événement à venir pour le moment.
        </Typography>
      )}

      <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 2, color: '#757575' }}>
        Événements passés
      </Typography>
      {pastEvents.length > 0 ? (
        <Grid container spacing={2}>
          {pastEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
              <EventCard event={event} isPastEvent={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          Aucun événement passé à afficher.
        </Typography>
      )}
    </Box>
  );
};
