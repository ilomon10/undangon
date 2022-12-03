import axios from "axios";
import { CONSTANTS } from "./Constants";

export const client = axios.create({
  baseURL: `${CONSTANTS.CURRENT_HOSTNAME}/api`,
});

export default {
  async getTemplate(id) {
    let res = await client.request({
      url: `/getTemplate/${id}/`,
      method: "GET",
    });
    return res.data;
  },
  async getTemplates() {
    const res = await client.request({
      url: "/getTemplates",
      method: "GET",
    });
    return res.data;
  },
  async postTemplate(data) {
    if (data.category) {
      data = {
        ...data,
        category: {
          _id: data.category,
          _model: "categories",
        },
      };
    }
    const res = await client.request({
      url: "/postTemplate",
      method: "POST",
      data,
    });
    return res.data;
  },
  async getCategories() {
    const res = await client.request({
      url: "/getCategories",
      method: "GET",
    });
    return res.data;
  },
  // async contents(options, id) {
  //   if (id) return await requestHandler(options, "categories", id);
  //   return await requestHandler(options, "contents");
  // },
};
