import { DataProvider, fetchUtils } from "react-admin";

const url = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

export const userDataProvider: DataProvider = {
    getList: (resource) => 
        httpClient(`${url}/${resource}`)
          .then(({ json }) => ({
            data: json.map((item: any) => ({
              id: item.user_id, 
              image: item.user_image,
              ...item
            })),
            total: json.length,
          }))
    // getList: (resource) => httpClient(`${url}/${resource}`).then(({json}) => ({
    //     data: json,
    //     total: json.length,
    // })),
}