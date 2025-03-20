import { Datagrid, List, TextField } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="user_name" label="Nom" />
      <TextField source="user_email" label="email" />
    </Datagrid>
  </List>
);
