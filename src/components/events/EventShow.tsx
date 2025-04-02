import {
  Show,
  TabbedShowLayout,
  TextField,
  DateField,
  FunctionField,
  useRecordContext,
  Datagrid,
  NumberField,
  ChipField,
  ArrayField
} from "react-admin";
import { Typography, Box, Stack, Grid, Chip } from "@mui/material";
import { CalendarToday, LocationOn, Person, Category, ConfirmationNumber } from "@mui/icons-material";

const EventTitle = () => {
  const record = useRecordContext();
  return <span>{record?.event_name}</span>;
};

const EventImage = () => {
  const record = useRecordContext();
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      minHeight: '500px',
      backgroundImage: `url(${record.event_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '8px',
      boxShadow: 3,
      position: 'relative',
      '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '56.25%'
      }
    }}>
      {!record.event_image && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          borderRadius: '8px'
        }}>
          <Typography variant="h6">Aucune image disponible</Typography>
        </Box>
      )}
    </Box>
  );
};

const TicketsTab = () => {
  const record = useRecordContext();
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Billets ({record.tickets?.length || 0})
      </Typography>

      <ArrayField source="tickets">
        <Datagrid bulkActionButtons={false}>
          <TextField source="ticket_id" label="ID" />
          <ChipField source="ticket_type" label="Type" />
          <NumberField
            source="ticket_price"
            label="Prix (Ar)"
            options={{ style: 'currency', currency: 'MGA' }}
            transform={value => value / 100}
          />
          <ChipField
            source="ticket_status"
            label="Statut"
            sx={{
              '& .MuiChip-root': {
                backgroundColor: record => {
                  switch(record.ticket_status) {
                    case 'SOLD': return '#4caf50';
                    case 'AVAILABLE': return '#2196f3';
                    case 'RESERVED': return '#ff9800';
                    default: return '#9e9e9e';
                  }
                },
                color: '#fff'
              }
            }}
          />
          <DateField
            source="ticket_creation_date"
            label="Date création"
            showTime
            locales="fr-FR"
          />
          <TextField source="user_id" label="Acheté par" />
        </Datagrid>
      </ArrayField>

      {(!record.tickets || record.tickets.length === 0) && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Aucun billet disponible pour cet événement
        </Typography>
      )}
    </Box>
  );
};

export const EventShow = () => {
  return (
    <Show title={<EventTitle />} sx={{
      '& .RaShow-main': {
        maxWidth: '1800px',
        margin: '0 auto'
      }
    }}>
      <TabbedShowLayout sx={{ p: { xs: 1, sm: 2, md: 3 } }}>

        <TabbedShowLayout.Tab label="Détails" path="">
          <Grid container spacing={4} sx={{ margin: 0, width: '100%' }}>

            <Grid item xs={12} md={6} sx={{
              height: { xs: '400px', md: '70vh' },
              padding: { xs: '0!important', md: '0 16px!important' }
            }}>
              <EventImage />
            </Grid>

            <Grid item xs={12} md={6} sx={{
              padding: { xs: '16px!important', md: '0 16px!important' }
            }}>
              <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                {/* Titre */}
                <Typography variant="h3" gutterBottom sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 4,
                  fontSize: { xs: '1.8rem', md: '2.2rem' }
                }}>
                  <TextField source="event_name" />
                </Typography>

                {/* Description */}
                <Typography variant="body1" paragraph sx={{
                  mb: 4,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line'
                }}>
                  <TextField source="event_description" />
                </Typography>

                {/* icônes */}
                <Stack spacing={3} sx={{ mb: 4 }}>
                  {/* Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday fontSize="large" sx={{
                      color: "#1976d2",
                      mr: 2,
                      fontSize: '2rem'
                    }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <FunctionField
                          source="event_date"
                          render={(record) =>
                            new Date(record.event_date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          }
                        />
                      </Typography>
                    </Box>
                  </Box>


                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn fontSize="large" sx={{
                      color: "#d32f2f",
                      mr: 2,
                      fontSize: '2rem'
                    }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lieu
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <TextField source="event_place" />
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person fontSize="large" sx={{
                      color: "#ffa000",
                      mr: 2,
                      fontSize: '2rem'
                    }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Organisateur
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <TextField source="event_organizer" />
                      </Typography>
                    </Box>
                  </Box>


                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Category fontSize="large" sx={{
                      color: "#7b1fa2",
                      mr: 2,
                      fontSize: '2rem'
                    }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Catégorie
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <Chip
                          label={<TextField source="event_category" />}
                          size="medium"
                          sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            fontSize: '0.9rem',
                            height: '28px'
                          }}
                        />
                      </Typography>
                    </Box>
                  </Box>


                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ConfirmationNumber fontSize="large" sx={{
                      color: "#009688",
                      mr: 2,
                      fontSize: '2rem'
                    }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Limite billets/type
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        <TextField source="event_tickets_limit_by_user_by_type" />
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </TabbedShowLayout.Tab>

        {/* billet */}
        <TabbedShowLayout.Tab label="Billets" path="tickets">
          <TicketsTab />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
