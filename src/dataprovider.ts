import { DataProvider, fetchUtils } from "react-admin";
import { Post } from "./types";
const apiUrl = "https://api.dsmartuniforms.com/api";
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
      data: json.map((record: any) => ({ ...record, id: record._id })),
      total: json.length,
    }));
  },
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${query}`).then(({ json }) => ({
      data: json.map((record: any) => ({ ...record, id: record._id })),
    }));
  },
  getManyReference: (resource, params) => {
    const query = {
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    return httpClient(`${apiUrl}/${resource}?${query}`).then(({ json }) => ({
      data: json.map((record: any) => ({ ...record, id: record._id })),
      total: json.length,
    }));
  },
  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: { ...json, id: json._id } })),
  updateMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json._id) }));
  },
  create: (resource, params) =>
    //@ts-ignore
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json._id } as Post,
    })),
  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),
  deleteMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json._id) }));
  },
};

export default dataProvider;
