import { Box, Card, CardContent } from "@mui/material";
// import { Box, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useLogin, useNotify } from "react-admin";
// import { LoginStyle } from "../style/LoginStyle.ts";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login({ email, password }).catch(() =>
      notify("Erreur d'authentification", { type: "warning" }),
    );
  };

  return (
    // <Box sx={LoginStyle}>
    //   <Card>
    //     <form onSubmit={handleSubmit}>
    //       <h1>Login</h1>
    //       <TextField label="Email" required={true} />
    //       <TextField label="Password" required={true} />
    //       <button type="submit">Login</button>
    //     </form>
    //   </Card>
    // </Box>

    <Box>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input name='email' type='email' value={email} onChange={e => setEmail(e.target.value)} required={true} />
            <input name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} required={true} />
            <button type='submit'>Login</button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
