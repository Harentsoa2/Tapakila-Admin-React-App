import { DataProvider, fetchUtils } from "react-admin";

const url = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

export const contactDataProvider: DataProvider = {
  getList: (resource) =>
    httpClient(`${url}/${resource}`).then(({ json }) => ({
      data: json.map((item: any) => ({
        id: item.message_id,
        ...item,
      })),
      total: json.length,
    })),

    delete: async (resource, params) => {
      const { json } = await httpClient(`${url}/${resource}/${params.id}`, {
        method: "DELETE",
      });
      return { data: json };
    },
};
