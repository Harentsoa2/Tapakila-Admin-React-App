import { Admin, houseDarkTheme, houseLightTheme, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { userDataProvider } from "./data/users-data-provider.ts";
import { UserList } from "./components/user/UserList.tsx";
import { People } from "@mui/icons-material";

export const App = () => {
  return (
    <Admin loginPage={LoginPage} authProvider={authProvider} dataProvider={userDataProvider} darkTheme={houseDarkTheme} theme={houseLightTheme} >
      <Resource name={"users"} list={UserList} icon={People}></Resource>
    </Admin>
  );
};
