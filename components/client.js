import axios from "axios";
import { SERVER_URL } from "./Constants";

export const client = axios.create({
  baseURL: `${SERVER_URL.toString()}/api`,
  headers: {
    "api-key": "API-f3b13c4dfddbed3934a19cb2489f6f094b3d87f6"
  }
});

export default {
  async templates({
    method = "GET",
    params,
    data,
  }) {
    const response = await client.request({
      url: "/content/items/template",
      method,
      params,
      data,
    });
    return response.data;
  },
  async category({
    method = "GET",
    params,
    data,
  }) {
    const response = client.request({
      url: "/content/items/category",
      method,
      params,
      data,
    })
    return response.data;
  },
  content({
    method = "GET",
    params,
    data,
  }) {
    return client.request({
      url: "/content/items/content",
      method,
      params,
      data,
    })
  }
};