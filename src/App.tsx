import { Admin, houseDarkTheme, houseLightTheme, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { userDataProvider } from "./data/users-data-provider.ts";
import { eventsDataProvider } from "./data/events-data-provider.ts";
import { UserList } from "./components/user/UserList.tsx";
import { People } from "@mui/icons-material";
import { EventList } from "./components/events/EventsList.tsx";
import { People, Event } from "@mui/icons-material";
import { compositeDataProvider } from "./data/compositeDataProvider.ts";

export const App = () => {
  return (
    <Admin 
      loginPage={LoginPage} authProvider={authProvider} dataProvider={userDataProvider} dataProvider={compositeDataProvider} 
      darkTheme={houseDarkTheme} theme={houseLightTheme}
      >
      <Resource name={"users"} list={UserList} icon={People}></Resource>
      <Resource name="users" list={UserList} icon={People} />
      <Resource name="events" list={EventList} icon={Event} />
    </Admin>
  );
};
