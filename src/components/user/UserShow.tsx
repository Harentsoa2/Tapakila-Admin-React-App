import { Avatar, Divider, Box, Stack, Typography } from "@mui/material";
import {
  Show,
  TextField,
  TabbedShowLayout,
  ArrayField,
  Datagrid,
  NumberField,
  DateField,
} from "react-admin";

const CustomEmpty = () => <div>Cette utilisateur n'a pas encore acheter des tickets</div>;

export const UserShow = () => {
  return (
    <Show
      sx={{
        "& .RaShow-card": {
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 119, 255, 0.1)",
        },
        "& .RaLabeled-label": {
          width: "150px",
          fontWeight: "bold",
          color: "#0077FF",
        },
      }}
    >
      <TabbedShowLayout sx={{ padding: "40px" }}>
        <TabbedShowLayout.Tab label="Profil">
          <Box
            sx={{
              display: "flex",
              gap: 5,
              alignItems: "flex-start",
              padding: "20px 0",
            }}
          >
            <Stack alignItems="center">
              <Avatar
                src="user_image"
                aria-label="Profil"
                sx={{
                  width: 80,
                  height: 80,
                  border: "3px solid #FFBA08",
                  backgroundColor: "#0077FF",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#0077FF",
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                  }}
                >
                  ID :
                </Typography>
                <TextField
                  source="user_id"
                  label={false}
                  sx={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                  }}
                />
              </Box>
            </Stack>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#FFBA08",
                width: "2px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flex: 1,
                paddingTop: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#0077FF",
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                  }}
                >
                  Nom :
                </Typography>
                <TextField
                  source="user_name"
                  label={false}
                  sx={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#0077FF",
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                  }}
                >
                  E-mail :
                </Typography>
                <TextField
                  source="user_email"
                  label={false}
                  sx={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#0077FF",
                    fontFamily: "Poppins",
                    fontSize: "0.8rem",
                  }}
                >
                  Date de création:
                </Typography>
                <DateField
                  source="user_first_login_date"
                  locales="fr-FR"
                  options={{
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }}
                  sx={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "1.1rem",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label={"Tickets"}>
          <ArrayField source="tickets" label={""}>
            <Datagrid
              bulkActionButtons={false}
              rowClick={false}
              empty={<CustomEmpty />}
              sx={{
                padding: "20px 0",
                "& .RaList-content": {
                  boxShadow: "0px 2px 8px rgba(0, 119, 255, 0.1)",
                },
                "& .RaDatagrid-headerCell": {
                  fontWeight: "bold",
                  color: "#FFBA08",
                },
                "& .column-ticket_id": {
                  padding: "20px 10px",
                },
                "& .RaDatagrid-row": {
                  "&:hover": {
                    backgroundColor: "rgba(0, 119, 255, 0.05)",
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(255, 186, 8, 0.05)",
                  },
                },
              }}
            >
              <TextField
                source="ticket_id"
                label="Numero"
                sx={{
                  color: "#0077FF",
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                }}
              />
              <TextField source="ticket_type" label="Type" />
              <NumberField source="ticket_price" label="Prix" />
            </Datagrid>
          </ArrayField>
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  );
};
