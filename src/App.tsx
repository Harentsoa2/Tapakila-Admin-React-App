import { Admin, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";

export const App = () => {
  return (
    <Admin loginPage={LoginPage} authProvider={authProvider} >
      <Resource name={"users"}></Resource>
    </Admin>
  );
};
