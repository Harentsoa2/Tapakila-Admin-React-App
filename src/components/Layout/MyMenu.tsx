import { People } from "@mui/icons-material";
import { MenuList } from "@mui/material";
import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu
    sx={{
      "& .MuiMenuItem-root": {
        "&:hover": {
          color: "#0077FF",
          "& .MuiListItemIcon-root": {
            color: "#0077FF",
          },
        },
      },
    }}
  >
    <MenuList>
      <Menu.Item
        to="/users"
        primaryText="Utilisateur"
        sx={{
          background: "#0077FF",
          margin: "20px 20px",
          fontWeight: "bold",
          border: "2px solid #0077FF",
          borderRadius: "10px",
          padding: "10px 20px",
          fontFamily: "Poppins",
        }}
        leftIcon={<People />}
      />
    </MenuList>
  </Menu>
);
