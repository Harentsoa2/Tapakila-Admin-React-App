import { Box } from "@mui/material";
import { Datagrid, DateField, ImageField, List, TextField } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <Box sx={{width: "50%", height: "50%"}}>
        <ImageField source="user_image" label="Profil" />
        <TextField source="id" />
        <TextField source="user_name" label="Nom" />
        <TextField source="user_email" label="Email" />
        <DateField source="user_first_login_date" label="Date de creation" />
      </Box>
    </Datagrid>
  </List>
);
