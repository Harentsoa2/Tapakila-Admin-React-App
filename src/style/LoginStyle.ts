import { SxProps } from "@mui/material";

export const LoginStyle: SxProps = {
  '& .MuiPaper-root': {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(/bgLogin.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },

  '& form': {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    border: "1px solid white",
    width: "40%",
    height: "80%"
  },

  '& h1': {
    fontSize: "4rem"
  }
}