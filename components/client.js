import axios from "axios";

const serverUrl = process.env.serverUrl;

export const client = axios.create({
  baseURL: `${serverUrl}/wp-json/wp/v2`
});

export default {
  posts({
    method = "GET",
    params,
    data,
  }) {
    return client.request({
      url: "/posts",
      method,
      params,
      data,
    })
  },
  comments({
    method = "GET",
    params,
    data,
  }) {
    return client.request({
      url: "/comments",
      method,
      params,
      data,
    })
  }
};