import { Admin, CustomRoutes, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { userDataProvider } from "./data/users-data-provider.ts";
import { UserList } from "./components/user/UserList.tsx";
import { People } from "@mui/icons-material";
import { UserShow } from "./components/user/UserShow.tsx";
import { Layout } from "./Layout.tsx";
import { Route } from "react-router-dom";


const Essai = () => {
  return <div>Hello</div>
}

export const App = () => {
  return (
    <Admin layout={Layout} loginPage={LoginPage} authProvider={authProvider} dataProvider={userDataProvider}>
      <Resource name={"users"} list={UserList} show={UserShow} icon={People}></Resource>
      <CustomRoutes>
        <Route path="/essai" element={<Essai />} />
      </CustomRoutes>
    </Admin>
  );
};
