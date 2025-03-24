import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu>
    <Menu.Item to="/users" primaryText="Users" sx={{border: "1px solid yellow"}} />
    <Menu.Item to="/essai" primaryText="Essai" />
  </Menu>
);
