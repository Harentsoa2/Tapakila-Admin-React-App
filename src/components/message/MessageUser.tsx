import { Typography } from "@mui/material";
import {
  ArrayField,
  Datagrid,
  DateField,
  RichTextField,
  TextField,
} from "react-admin";

const CustomEmpty = () => (
  <Typography sx={{ fontFamily: "Poppins", padding: "20px 0", color: "red" }}>
    Pas de commentaire
  </Typography>
);

const MyExpand = () => {
  return <RichTextField source="message_content" />;
};

export default function MessageUser() {
  return (
    <ArrayField source="messages" label="">
      <Datagrid
        bulkActionButtons={false}
        empty={<CustomEmpty />}
        expand={<MyExpand />}
      >
        {/* <RichTextField source="message_content" />  */}
        <TextField source="message_id" label="ID" />
        <TextField source="message_subject" label="Titre" />
        <DateField
          source="message_date"
          label="Date de création"
          showTime
          sx={{ color: "#0077FF", fontFamily: "Poppins", fontSize: "1rem" }}
        />
      </Datagrid>
    </ArrayField>
  );
}
