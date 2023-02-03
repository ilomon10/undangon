import axios from "axios";
import { CONSTANTS } from "./Constants";

export const client = axios.create({
  baseURL: `${CONSTANTS.CURRENT_HOSTNAME}/api`,
});

export default {
  async getCanvaLink(id) {
    let res = await client.request({
      url: `/getCanvaLink/${id}/`,
      method: "GET",
    });
    return res.data;
  },
  async getCanvaLinks(params) {
    const res = await client.request({
      url: "/getCanvaLinks",
      method: "GET",
      params,
    });
    return res.data;
  },
  async postCanvaLink(data) {
    const res = await client.request({
      url: "/postCanvaLink",
      method: "POST",
      data,
    });
    return res.data;
  },

  async getTemplate(id) {
    let res = await client.request({
      url: `/getTemplate/${id}/`,
      method: "GET",
    });
    return res.data;
  },
  async getTemplates(params) {
    const res = await client.request({
      url: "/getTemplates",
      method: "GET",
      params,
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

  async getComments(params) {
    const res = await client.request({
      url: "/getComments",
      method: "GET",
      params,
    });
    return res.data;
  },

  async postComments(data) {
    const res = await client.request({
      url: "/postComments",
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

  async getInvitation(id, params) {
    const res = await client.request({
      url: `/getInvitation/${id}`,
      method: "GET",
      params,
    });
    return res.data;
  },
  async getInvitationBySlug(slug, params) {
    const res = await client.request({
      url: `/getInvitation/by/${slug}`,
      method: "GET",
      params,
    });
    return res.data;
  },
  async getInvitations(params) {
    const res = await client.request({
      url: "/getInvitations",
      method: "GET",
      params,
    });
    return res.data;
  },

  async postInvitation(data) {
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
      url: "/postInvitation",
      method: "POST",
      data,
    });
    return res.data;
  },
};
