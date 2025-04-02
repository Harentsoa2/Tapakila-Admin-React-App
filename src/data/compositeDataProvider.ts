import { userDataProvider } from "./users-data-provider.ts";
import { eventsDataProvider } from "./events-data-provider.ts";
import { contactDataProvider } from "./contact-data-provider.ts";

const compositeDataProvider = {
  getList: async (resource: any) => {
    if (resource === "users") {
      return userDataProvider.getList();
    } else if (resource === "events") {
      return eventsDataProvider.getList();
    } else if (resource === "contact") {
      return contactDataProvider.getList();
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.getOne(params);
    } else if (resource === "events") {
      return eventsDataProvider.getOne(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getMany: async (resource: any, params: any) => {
    if (resource === "events") {
      return eventsDataProvider.getMany(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  create: async (resource: any, params: any) => {
    if (resource === "events") {
      return eventsDataProvider.create(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  update: async (resource: any, params: any) => {
    if (resource === "events") {
      return eventsDataProvider.update(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  delete: async (resource: any, params: any) => {
    if (resource === "events") {
      return eventsDataProvider.delete(params);
    } else if (resource === "contact") {
      return contactDataProvider.delete(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },
};

export { compositeDataProvider };
