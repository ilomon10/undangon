import axios from "axios";
import { SERVER_URL } from "./Constants";

export const vanilla = (function () {
  const baseURL = `${SERVER_URL.toString()}/api`;
  function f({
    url,
    method,
    params = {},
    data
  }) {
    const compiledURL = new URL(`${baseURL}${url}`);
    console.log(window.location);
    if (params) {
      Object.keys(params).forEach(key => {
        compiledURL.searchParams.append(key, params[key]);
      });
    }
    return fetch(compiledURL.toString(), {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(async res => {
      const json = await res.json();
      if (!res.ok) {
        const Err = new Error(res.statusText);
        Err.response = json;
        throw Err;
      }
      return json;
    })
  }
  const self = {
    posts: ({ method = "GET", params, data }) => {
      return f({ url: "/posts", method, params, data });
    },
    comments: ({ method = "GET", params, data }) => {
      return f({ url: "/comments", method, params, data });
    }
  }
  return self;
})()

export const client = axios.create({
  baseURL: `${SERVER_URL.toString()}/wp-json/wp/v2`
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