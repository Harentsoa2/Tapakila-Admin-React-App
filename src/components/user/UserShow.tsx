import { Avatar, Divider } from "@mui/material";
import { Show, SimpleShowLayout, TextField, DateField } from "react-admin";

export const UserShow = () => (
  <Show>
    <SimpleShowLayout direction={"row"} divider={<Divider flexItem />} spacing={5} sx={{padding: "40px"}}>
      <Avatar src="user_image" aria-label="Profil" />
      <TextField source="user_id" label="id" />
      <TextField source="user_name" label="Nom" />
      <TextField source="user_email" label="Email" />
      <DateField source="user_first_login_date" label="Date de creation" />
    </SimpleShowLayout>
  </Show>
);
