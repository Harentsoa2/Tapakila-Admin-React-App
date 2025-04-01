import { Typography } from "@mui/material";
import { ArrayField, Datagrid, RichTextField } from "react-admin";

const CustomEmpty = () => (
  <Typography sx={{ fontFamily: "Poppins", padding: "20px 0", color: "red" }}>
    Pas de commentaire
  </Typography>
);

export default function MessageUser() {
  return (
    <ArrayField source="messages" label="">
      <Datagrid bulkActionButtons={false} empty={<CustomEmpty/>}>
        <RichTextField source="message_content" /> 
      </Datagrid>
    </ArrayField>
  );
}
