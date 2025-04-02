import {
  ArrayField,
  Datagrid,
  NumberField,
  ChipField,
  TextField,
  DateField,
  useRecordContext
} from "react-admin";
import { Typography } from "@mui/material";

export const TicketsList = () => {
  const record = useRecordContext();

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Liste des tickets
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
    </>
  );
};
