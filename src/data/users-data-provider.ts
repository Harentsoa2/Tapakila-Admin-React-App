import { DataProvider, fetchUtils } from "react-admin";

const url = "http://localhost:3000/api";
const httpClient = fetchUtils.fetchJson;

export const userDataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      _page: page,
      _limit: perPage,
      _sort: field,
      _order: order.toLowerCase(),
      ...params.filter, // Ajoute les filtres si présents
    };

    return httpClient(`${url}/${resource}?${new URLSearchParams(query).toString()}`)
      .then(({ json, headers }) => {
        // Extraction du nombre total d'éléments depuis les headers
        const total = parseInt(headers.get('x-total-count') || json.length, 10);
        
        return {
          data: json.map((item: any) => ({
            id: item.user_id,
            ...item,
          })),
          total,
        };
      });
  },
  
  getOne: (resource, params) =>
    httpClient(`${url}/${resource}/${params.id}`).then(({ json }) => ({
        data: { ...json, id: json.user_id }
    })),
};
