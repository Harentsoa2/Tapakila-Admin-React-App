import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:3000/api/events";
const httpClient = fetchUtils.fetchJson;

export const eventsDataProvider = {
  getList: async () => {
    const { json } = await httpClient(apiUrl);
    return {
      data: json.map((event: any) => ({ id: event.event_id, ...event })),
      total: json.length,
    };
  },

  getOne: async (params: any) => {
    const { json } = await httpClient(`${apiUrl}/${params.id}`);
    return { data: { id: json.event_id, ...json } };
  },

  getMany: async (params: any) => {
    const query = {
      filter: JSON.stringify({ ids: params.ids }),
    };
    const { json } = await httpClient(`${apiUrl}?${stringify(query)}`);
    return {
      data: json.map((event: any) => ({ id: event.event_id, ...event })),
    };
  },

  create: async (params: any) => {
    const { json } = await httpClient(apiUrl, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.event_id, ...json } };
  },

  update: async (params: any) => {
    const { json } = await httpClient(`${apiUrl}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.event_id, ...json } };
  },

  delete: async (params: any) => {
    const { json } = await httpClient(`${apiUrl}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },
};
