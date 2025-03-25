import { DataProvider, fetchUtils } from "react-admin";

const url = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

export const userDataProvider: DataProvider = {
  getList: (resource) => httpClient(`${url}/${resource}`).then(({ json }) => ({ 
    data: json.map((item: any) => ({
      id: item.user_id, ...item,}
    )),
    total: json.length,
  })),

  getOne: (resource, params) =>
    httpClient(`${url}/${resource}/${params.id}`).then(({ json }) => ({
        data: { ...json, id: json.user_id }
    })),
};
