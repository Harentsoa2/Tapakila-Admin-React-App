import IconButton from "@mui/material/IconButton";
import { AppBar, useLogout } from "react-admin";
import { Avatar, Tooltip } from "@mui/material";
import MyToolbar from "../../screen/MyToolbar";

export default function MyAppBar() {
  const logout = useLogout();

  return (
    <AppBar
      toolbar={<MyToolbar />}
      sx={{
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
        padding: "10px 20px",
        borderBottom: "2px solid #FFBA08",
        borderBottomRightRadius: "20px",
        borderBottomLeftRadius: "20px",
        "& .RaConfigurable-root": {
          display: "none"
        }, 
        "& .MuiSvgIcon-root": {
          fontSize: "2rem",
          color: "#FFBA08"
        },

      }}
      userMenu={
        <Tooltip title="Log Out">
          <IconButton onClick={logout} sx={{ p: 0 }}>
            <Avatar src="/avatar.jfif" />
          </IconButton>
        </Tooltip>
      }
    ></AppBar>
  );
}
