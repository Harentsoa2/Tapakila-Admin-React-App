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
  SaveButton
} from "react-admin";
import { Typography, Box, Alert, CircularProgress, Stack } from "@mui/material";
import { useState } from 'react';

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      sx={{
        backgroundColor: '#1e88e5',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1565c0',
        }
      }}
    />
  </Toolbar>
);

export const EventCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      if (data.event_image_url) {
        try {
          new URL(data.event_image_url);
        } catch {
          throw new Error("L'URL de l'image n'est pas valide");
        }
      }


      const eventDate = new Date(data.event_date);
      const [hours, minutes] = data.event_time.split(':');
      eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      const transformedData = {
        ...data,
        event_image: data.event_image_url,
        event_date: eventDate.toISOString(),
        event_creation_date: new Date().toISOString()
      };

      await create('events', { data: transformedData }, {
        onSuccess: () => {
          notify('Événement créé avec succès', { type: 'success' });
          redirect('list');
        },
        onError: (error) => {
          setError(error.message || 'Erreur lors de la création');
          notify('Erreur lors de la création', { type: 'error' });
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      notify(err instanceof Error ? err.message : 'Erreur inconnue', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    sectionBox: {
      p: 3,
      mb: 3,
      bgcolor: '#f8fafc',
      borderRadius: 2,
      borderLeft: '4px solid #1e88e5',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    sectionTitle: {
      mb: 2,
      color: '#1e88e5',
      fontWeight: 'bold',
      borderBottom: '2px solid #ffeb3b',
      pb: 1
    },
    input: {
      '& .MuiInputBase-root': {
        backgroundColor: '#ffffff',
        color: '#000000',
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      },
      '& .MuiInputLabel-root': {
        color: '#1e88e5'
      },
      '& .MuiFilledInput-underline:before': {
        borderBottomColor: '#1e88e5'
      },
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: '#ffeb3b'
      },
      '& .MuiSelect-select': {
        color: '#000000'
      }
    },
    alert: {
      mb: 2,
      backgroundColor: '#fff8e1',
      color: '#5d4037'
    }
  };

  return (
    <Create title="Créer un nouvel événement" sx={{ bgcolor: '#f5f7fa' }}>
      <SimpleForm
        onSubmit={handleSubmit}
        defaultValues={{
          event_status: "UPLOADED",
          event_tickets_limit_by_user_by_type: 5,
          event_date: new Date(),
          event_time: '12:00',
          event_image_url: ''
        }}
        sanitizeEmptyValues
        toolbar={<CustomToolbar />}
      >
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress sx={{ color: '#1e88e5' }} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={styles.alert}>
            {error}
          </Alert>
        )}

        <Box sx={styles.sectionBox}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Informations principales
          </Typography>

          <TextInput
            source="event_name"
            label="Nom de l'événement *"
            fullWidth
            validate={[required('Ce champ est obligatoire')]}
            sx={styles.input}
          />

          <TextInput
            source="event_description"
            label="Description *"
            multiline
            rows={3}
            fullWidth
            validate={[required('Ce champ est obligatoire')]}
            sx={styles.input}
          />

          <Stack direction="row" spacing={2}>
            <DateInput
              source="event_date"
              label="Date *"
              validate={[required('Ce champ est obligatoire')]}
              fullWidth
              sx={styles.input}
            />
            <TimeInput
              source="event_time"
              label="Heure *"
              validate={[required('Ce champ est obligatoire')]}
              fullWidth
              sx={styles.input}
            />
          </Stack>
        </Box>

        <Box sx={styles.sectionBox}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Localisation
          </Typography>
          <TextInput
            source="event_place"
            label="Lieu *"
            fullWidth
            validate={[required('Ce champ est obligatoire')]}
            sx={styles.input}
          />
        </Box>

        <Box sx={styles.sectionBox}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Configuration
          </Typography>
          <SelectInput
            source="event_status"
            label="Statut"
            choices={[
              { id: 'UPLOADED', name: 'Uploadé' },
              { id: 'DRAFT', name: 'Brouillon' },
              { id: 'PUBLISHED', name: 'Publié' }
            ]}
            sx={styles.input}
          />
          <NumberInput
            source="event_tickets_limit_by_user_by_type"
            label="Limite de tickets par utilisateur"
            min={1}
            sx={styles.input}
          />
        </Box>

        <Box sx={styles.sectionBox}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Média
          </Typography>
          <TextInput
            source="event_image_url"
            label="URL de l'image de l'événement"
            fullWidth
            sx={styles.input}
            helperText="Collez l'URL complète de l'image"
          />
        </Box>
      </SimpleForm>
    </Create>
  );
};
