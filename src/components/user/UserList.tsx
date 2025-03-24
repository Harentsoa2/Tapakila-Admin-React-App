import { Avatar } from "@mui/material";
import { Datagrid, DateField, List, TextField } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
        <Avatar src="user_image" aria-label="Profil" sx={{marginLeft: '20px'}} />
        <TextField source="user_name" label="Nom" />
        <TextField source="user_email" label="Email" />
        <DateField source="user_first_login_date" label="Date de creation" />
    </Datagrid>
  </List>
);
