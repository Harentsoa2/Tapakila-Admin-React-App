import { fetchUtils } from "react-admin";

const url = "http://localhost:3000/api/contact";
const httpClient = fetchUtils.fetchJson;

export const contactDataProvider = {
  getList: async () => {
    const { json } = await httpClient(url);

    return {
      data: json.map((message: any) => ({
        id: message.message_id,
        ...message,
      })),
      total: json.length,
    };
  },

  getOne: async (params: any) => {
    const { json } = await httpClient(`${url}/${params.id}`);

    return {
      data: json.map((message: any) => ({
        id: message.message_id,
        ...message,
      })),
      total: json.length,
    };
  },

  delete: async (params: any) => {
    const { json } = await httpClient(`${url}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },
};
