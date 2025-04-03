import { Admin, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider.ts";
import { LoginPage } from "./screen/LoginPage.tsx";
import { UserList } from "./components/user/UserList.tsx";

import { People, Event, Message } from "@mui/icons-material";
import { compositeDataProvider } from "./data/compositeDataProvider.ts";
import { Layout } from "./Layout.tsx";
import { UserShow } from "./components/user/UserShow.tsx";
import MessageList from "./components/message/MessageList.tsx";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { EventList } from "./components/events/EventsList.tsx";
import { EventShow } from "./components/events/EventShow";
import { EventCreate } from "./components/events/EventCreate";


const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff5722',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    RaCreate: {
      styleOverrides: {
        root: {
          maxWidth: '800px',
          margin: '0 auto',
        },
      },
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Admin

        loginPage={LoginPage}
        authProvider={authProvider}
        dataProvider={compositeDataProvider}
        layout={Layout}

        sx={{
          "& .RaSidebar-drawer": {
            display: "none",
          },
          "& .RaLayout-content": {
            padding: 2,
            backgroundColor: 'background.default',
          },
        }}

        requireAuth
        disableTelemetry
      >
        {/* Ressource Utilisateurs */}
        <Resource
          name="users"
          list={UserList}
          show={UserShow}
          icon={People}
          options={{ label: 'Utilisateurs' }}
        />

        <Resource
          name="events"
          list={EventList}
          create={EventCreate}
          show={EventShow}
          edit={EventCreate}
          icon={Event}
          options={{
            label: 'Événements',
            subMenu: 'management',
          }}
        />

        {/* Ressource Contact (Messages) */}
        <Resource
          name="contact"
          list={MessageList}
          icon={Message}
          options={{ label: 'Messages' }}
        />


      </Admin>
    </ThemeProvider>
  );
};

export default App;
