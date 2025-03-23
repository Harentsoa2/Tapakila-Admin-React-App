import { userDataProvider } from "./users-data-provider.ts";
import { eventsDataProvider } from "./events-data-provider.ts";

// Créez le dataProvider composite
const compositeDataProvider = {
  getList: async (resource, params) => {
    if (resource === "users") {
      return userDataProvider.getList(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.getList(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async (resource, params) => {
    if (resource === "users") {
      return userDataProvider.getOne(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.getOne(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },


};

export { compositeDataProvider };
