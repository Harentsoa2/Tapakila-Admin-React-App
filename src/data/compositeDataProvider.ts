import { userDataProvider } from "./users-data-provider.ts";
import { eventsDataProvider } from "./events-data-provider.ts";
import { contactDataProvider } from "./contact-data-provider.ts";

const convertEventDates = (data: any) => {
  if (data.event_date) {
    // Convertit la date du format DateTimePicker
    data.event_date = new Date(data.event_date).toISOString();
  }
  if (data.event_creation_date) {
    data.event_creation_date = new Date().toISOString();
  }
  return data;
};

const compositeDataProvider = {
  getList: async (resource: any) => {
    if (resource === "users") {
      return userDataProvider.getList();
    } else if (resource === "events") {
      const result = await eventsDataProvider.getList();

      result.data = result.data.map((event: any) => ({
        ...event,
        event_date: new Date(event.event_date),
        event_creation_date: new Date(event.event_creation_date)
      }));
      return result;
    } else if (resource === "contact") {
      return contactDataProvider.getList();
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.getOne(params);
    } else if (resource === "events") {
      const result = await eventsDataProvider.getOne(params);
      return {
        ...result,
        data: {
          ...result.data,
          event_date: new Date(result.data.event_date),
          event_creation_date: new Date(result.data.event_creation_date)
        }
      };
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getMany: async (resource: any, params: any) => {
    if (resource === "events") {
      const result = await eventsDataProvider.getMany(params);
      result.data = result.data.map((event: any) => ({
        ...event,
        event_date: new Date(event.event_date),
        event_creation_date: new Date(event.event_creation_date)
      }));
      return result;
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  create: async (resource: any, params: any) => {
    if (resource === "events") {

      const convertedParams = {
        ...params,
        data: convertEventDates(params.data)
      };
      return eventsDataProvider.create(convertedParams);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  update: async (resource: any, params: any) => {
    if (resource === "events") {
      const convertedParams = {
        ...params,
        data: convertEventDates(params.data)
      };
      return eventsDataProvider.update(convertedParams);
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


  getManyReference: async (resource: any, params: any) => {
    if (resource === "events") {
      const result = await eventsDataProvider.getList();
      result.data = result.data.map((event: any) => ({
        ...event,
        event_date: new Date(event.event_date),
        event_creation_date: new Date(event.event_creation_date)
      }));
      return result;
    }
    throw new Error(`Unknown resource: ${resource}`);
  },
};

export { compositeDataProvider };
