import { Admin, houseDarkTheme, houseLightTheme, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { eventsDataProvider } from "./data/events-data-provider.ts";
import { UserList } from "./components/user/UserList.tsx";
import { EventList } from "./components/events/EventsList.tsx";
import { People, Event } from "@mui/icons-material";
import { compositeDataProvider } from "./data/compositeDataProvider.ts";

export const App = () => {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={compositeDataProvider}
      darkTheme={houseDarkTheme}
      theme={houseLightTheme}
    >
      <Resource name="users" list={UserList} icon={People} />
      <Resource name="events" list={EventList} icon={Event} />
    </Admin>
  );
};
