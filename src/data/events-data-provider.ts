import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:3000/api/events";
const httpClient = fetchUtils.fetchJson;


const safeDateConvert = (dateString: string | Date | null) => {
  if (!dateString) return new Date();
  try {
    return new Date(dateString);
  } catch {
    return new Date();
  }
};

const validateEventSchema = (event: any) => {
  if (!event.event_id) {
    throw new Error('Invalid event data: missing event_id');
  }
  return true;
};


const convertResponseDates = (event: any) => {
  try {
    validateEventSchema(event);
    return {
      id: event.event_id,
      ...event,
      event_date: safeDateConvert(event.event_date),
      event_creation_date: safeDateConvert(event.event_creation_date),
    };
  } catch (error) {
    console.error('Data conversion error:', error);
    throw error;
  }
};


const prepareRequestData = (data: any) => {
  try {
    const { id, ...requestData } = data;

    if (!data.event_name) {
      throw new Error('Event name is required');
    }

    return {
      ...requestData,
      event_id: id || `E${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      event_date: safeDateConvert(data.event_date).toISOString(),
      event_creation_date: data.event_creation_date
        ? safeDateConvert(data.event_creation_date).toISOString()
        : new Date().toISOString(),
    };
  } catch (error) {
    console.error('Request preparation error:', error);
    throw error;
  }
};

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error(
    error.body?.message ||
    error.message ||
    'Server communication failed'
  );
};

export const eventsDataProvider = {
  getList: async () => {
    try {
      const { json } = await httpClient(apiUrl);
      return {
        data: json.map(convertResponseDates),
        total: json.length,
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  getOne: async (params: any) => {
    try {
      const { json } = await httpClient(`${apiUrl}/${params.id}`);
      return {
        data: convertResponseDates(json)
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  getMany: async (params: any) => {
    try {
      const query = {
        filter: JSON.stringify({ ids: params.ids }),
      };
      const { json } = await httpClient(`${apiUrl}?${stringify(query)}`);
      return {
        data: json.map(convertResponseDates),
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  create: async (params: any) => {
    try {
      const requestData = prepareRequestData(params.data);

      const { json } = await httpClient(apiUrl, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }),
      });

      return {
        data: convertResponseDates(json)
      };
    } catch (error) {
      handleApiError(error);
    }
  },

  update: async (params: any) => {
    try {
      const requestData = prepareRequestData(params.data);

      const { json } = await httpClient(`${apiUrl}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(requestData),
        headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }),
      });

      return {
        data: convertResponseDates(json)
      };
    } catch (error) {
      handleApiError(error);
    }
  },

 delete: async (params: any) => {
  try {
    const response = await fetch(`/api/events/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Delete failed');
    }

    return { data: { id: params.id } };
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
},

  getManyReference: async (params: any) => {
    try {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      const { json, headers } = await httpClient(`${apiUrl}?${stringify(query)}`);

      return {
        data: json.map(convertResponseDates),
        total: parseInt(headers.get('content-range')?.split('/').pop() || json.length),
      };
    } catch (error) {
      handleApiError(error);
    }
  },
};
