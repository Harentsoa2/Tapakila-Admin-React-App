import { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  NumberInput,
  SelectInput,
  useNotify,
  useRedirect,
  useCreate,
  DateInput,
  TimeInput,
  Toolbar,
  SaveButton,
  ImageInput,
  ImageField
} from "react-admin";
import {
  Box,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Divider,
  Typography,
  useTheme
} from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { lighten } from '@mui/system';

const EventCreate = () => {
  const theme = useTheme();
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      const requiredFields = ['event_name', 'event_description', 'event_place', 'event_date'];
      const missingFields = requiredFields.filter(field => !data[field]);

      if (missingFields.length > 0) {
        throw new Error(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
      }


      const eventDate = new Date(data.event_date);
      if (data.event_time) {
        const [hours, minutes] = data.event_time.split(':');
        eventDate.setHours(parseInt(hours, 10));
        eventDate.setMinutes(parseInt(minutes, 10));
      }


      await create('events', {
        data: {
          ...data,
          event_date: eventDate.toISOString(),
          event_image: data.event_image_url || null
        }
      }, {
        onSuccess: () => {
          notify('Événement créé avec succès', { type: 'success' });
          redirect('list');
        },
        onError: (error) => {
          console.error("Erreur complète:", error);
          setError(error.message);
          notify(error.message, { type: 'error' });
        }
      });
    } catch (err) {
      setError(err.message);
      notify(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Create
      title={
        <Box display="flex" alignItems="center">
          <EventAvailableIcon sx={{
            color: theme.palette.secondary.main,
            mr: 1,
            fontSize: '2rem'
          }} />
          <Typography variant="h5" component="h1" sx={{
            color: theme.palette.primary.contrastText,
            fontWeight: 600
          }}>
            Créer un nouvel événement
          </Typography>
        </Box>
      }
      sx={{
        '& .RaCreate-card': {
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
          borderRadius: '12px',
          boxShadow: `0 4px 20px #FFBA08`
        }
      }}
    >
      <SimpleForm
        onSubmit={handleSubmit}
        toolbar={
          <Toolbar sx={{ justifyContent: 'flex-end' }}>
            <SaveButton
              label="Publier l'événement"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.getContrastText(theme.palette.secondary.main),
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark
                }
              }}
            />
          </Toolbar>
        }
      >
        <Card sx={{
          width: "100%",
          margin: "20px 0",
          borderLeft: `4px solid #FFBA08`
        }}>
          <CardContent>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Typography variant="h6" gutterBottom sx={{
              color: "#0077FF",
              display: 'flex',
              alignItems: 'center'
            }}>
              Informations de base
            </Typography>

            <TextInput
              source="event_name"
              label="Nom de l'événement"
              validate={required()}
              fullWidth
              sx={{
                '& .MuiInputLabel-root': { color: theme.palette.secondary.light },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: theme.palette.secondary.dark }
                }
              }}
            />

            <TextInput
              source="event_description"
              label="Description"
              multiline
              rows={4}
              validate={required()}
              sx={{ mt: 2 }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <DateInput
                source="event_date"
                label="Date"
                validate={required()}
                sx={{ flex: 1 }}
              />
              <TimeInput
                source="event_time"
                label="Heure"
                validate={required()}
                sx={{ flex: 1 }}
              />
            </Stack>

            <TextInput
              source="event_place"
              label="Lieu"
              validate={required()}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        <Card sx={{
          width: "100%",
          borderLeft: `4px solid #FFBA08`
        }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{
              color: "#0077FF",
              display: 'flex',
              alignItems: 'center'
            }}>
              Visuel et configuration
            </Typography>

            <ImageInput
              source="event_image"
              label="Image de l'événement"
              accept="image/*"
              sx={{
                mt: 1,
                '& .MuiDropzoneArea-root': {
                  backgroundColor: lighten(theme.palette.primary.dark, 0.2),
                  borderColor: theme.palette.secondary.dark
                }
              }}
            >
              <ImageField
                source="src"
                sx={{
                  '& img': {
                    maxHeight: 200,
                    objectFit: 'contain'
                  }
                }}
              />
            </ImageInput>

            <TextInput
              source="event_image_url"
              label="Ou URL de l'image"
              helperText="URL complète vers l'image"
              sx={{ mt: 2 }}
            />

            <SelectInput
              source="event_status"
              label="Statut"
              choices={[
                { id: 'DRAFT', name: 'Brouillon' },
                { id: 'PUBLISHED', name: 'Publié' },
                { id: 'UPLOADED', name: 'Uploadé' }
              ]}
              defaultValue="PUBLISHED"
              sx={{ mt: 2 }}
            />

            <NumberInput
              source="event_tickets_limit_by_user_by_type"
              label="Limite de tickets par utilisateur"
              min={1}
              defaultValue={5}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress sx={{ color: theme.palette.secondary.main }} />
          </Box>
        )}
      </SimpleForm>
    </Create>
  );
};

export default EventCreate;
