import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useLogout } from "react-admin";
import { Avatar, Tooltip } from "@mui/material";

export default function ButtonAppBar() {
  const logout = useLogout();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
          padding: "10px 20px",
          borderBottom: "2px solid #FFBA08",
          borderBottomRightRadius: "20px",
          borderBottomLeftRadius: "20px",
        }}
      >
        <Toolbar>
          <Avatar src="/tapakila.png" />
          <Typography
            variant="h6"
            sx={{
              flexGrow: "1",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#000",
              display: "inline-block",
              padding: "10px",
            }}
          >
            <span style={{ color: "#0077FF" }}>Tap</span>
            <span style={{ color: "#FFBA08" }}>akila</span>
            <span style={{ color: "#0077FF", paddingLeft: "10px" }}>Ad</span>
            <span style={{ color: "#FFBA08" }}>min</span>
          </Typography>
          <Tooltip title="Log Out">
            <IconButton onClick={logout} sx={{ p: 0 }}>
              <Avatar src="/avatar.jfif" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  );
}
