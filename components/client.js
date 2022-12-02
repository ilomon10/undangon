import axios from "axios";
import { SERVER_URL } from "./Constants";

export const client = axios.create({
  baseURL: `${SERVER_URL.toString()}/api`,
  headers: {
    "api-key": "API-f3b13c4dfddbed3934a19cb2489f6f094b3d87f6"
  }
});

export default {
  content: {
    item: {
      async template(options) {
        return await requestHandler(options, "content", "item", "template");
      },
      async category(options) {
        return await requestHandler(options, "content", "item", "category");
      },
      async content(options) {
        return await requestHandler(options, "content", "item", "content");
      },
    },
    items: {
      async template(options = {}) {
        return await requestHandler(options, "content", "items", "template");
      },
      async category(options) {
        return await requestHandler(options, "content", "items", "category");
      },
      async content(options) {
        return await requestHandler(options, "content", "items", "content");
      },
    }
  },
};

async function requestHandler(options, ...path) {
  const url = path.reduce((p, c) => {
    return `${p}/${c}`;
  }, "");
  const response = await client.request({
    url: url,
    method: options.method || "GET",
    params: options.params,
    data: options.data,
  })
  return response.data;
}