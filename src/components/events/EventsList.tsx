import { List, useListContext } from "react-admin";
import { Grid } from "@mui/material";
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

  if (isLoading) return <div style={{background: "transparent"}}>Chargement en cours...</div>;

  return (
    <Grid container spacing={2}>
      {data.map((event) => (
        <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};
