import { Admin, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { UserList } from "./components/user/UserList.tsx";
import { EventList } from "./components/Events/EventsList.tsx";
import { People, Event } from "@mui/icons-material";
import { compositeDataProvider } from "./data/compositeDataProvider.ts";
import { Layout } from "./Layout.tsx";
import { UserShow } from "./components/user/UserShow.tsx";

export const App = () => {
  return (
    <Admin 
      loginPage={LoginPage} authProvider={authProvider} dataProvider={compositeDataProvider} 
      layout={Layout}
      sx={{
        '& .RaSidebar-drawer': {
            display: 'none'
        }
    }}
      >
      <Resource name="users" list={UserList} show={UserShow} icon={People} />
      <Resource name="events" list={EventList} icon={Event} />
    </Admin>
  );
};
