import { fetchUtils } from "react-admin";

const url = "http://localhost:3000/api/users";
const httpClient = fetchUtils.fetchJson;


export const userDataProvider = {
  getList: async (params: any) => {
    const { page, pageSize } = params;
 
     const query = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize)
    });
  
    const { json } = await httpClient(`${url}?${query.toString()}`);
  
    return {
      data: json.data.map((user: any) => ({ id: user.user_id, ...user })),
      total: json.total,
    };
  };

  getOne: async (params: any) => {
    const { json } = await httpClient(`${url}/${params.id}`);
    return { data: { id: json.event_id, ...json } };
  },

};
