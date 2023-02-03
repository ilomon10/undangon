import axios from "axios";
import { CONSTANTS, SERVER_URL } from "./Constants";

const internal = axios.create({
  baseURL: `${CONSTANTS.SERVER_URL}/api`,
  headers: {
    "api-key": CONSTANTS.SERVER_API_KEY,
  },
});

export default {
  content: {
    item: {
      async canva_links(options, id) {
        const path = ["content", "item", "canva_links"];
        if (id) return await requestHandler(options, ...path, id);
        return await requestHandler(options, ...path);
      },
      async templates(options, id) {
        if (id)
          return await requestHandler(
            options,
            "content",
            "item",
            "templates",
            id
          );
        return await requestHandler(options, "content", "item", "templates");
      },
      async categories(options, id) {
        if (id)
          return await requestHandler(
            options,
            "content",
            "item",
            "categories",
            id
          );

        return await requestHandler(options, "content", "item", "categories");
      },
      async invitations(options, id) {
        if (id)
          return await requestHandler(
            options,
            "content",
            "item",
            "invitations",
            id
          );
        return await requestHandler(options, "content", "item", "invitations");
      },
      async comments(options, id) {
        if (id)
          return await requestHandler(
            options,
            "content",
            "item",
            "comments",
            id
          );
        return await requestHandler(options, "content", "item", "comments");
      },
    },
    items: {
      async canva_links(options = {}) {
        const path = ["content", "items", "canva_links"];
        return await requestHandler(options, ...path);
      },
      async templates(options = {}) {
        const path = ["content", "items", "templates"];
        return await requestHandler(options, ...path);
      },
      async templates(options = {}) {
        return await requestHandler(options, "content", "items", "templates");
      },
      async categories(options) {
        return await requestHandler(options, "content", "items", "categories");
      },
      async invitations(options) {
        return await requestHandler(options, "content", "items", "invitations");
      },
      async comments(options) {
        return await requestHandler(options, "content", "items", "comments");
      },
    },
  },
  assets: {
    image: {
      async get(id, options) {
        return await requestHandler(options, "assets", "image", id);
      },
    },
    async get(id) {
      return await requestHandler(options, "assets", id);
    },
  },
};

async function requestHandler(options, ...path) {
  let url = path.reduce((p, c) => {
    return `${p}/${c}`;
  }, `${CONSTANTS.SERVER_URL}/api`);

  return await internal({
    url,
    method: options.method,
    params: options.params,
    data: options.data,
  });
}
