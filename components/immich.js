import axios from "axios";
import { CONSTANTS } from "./Constants";

class Immich {
  constructor(options) {
    this.options = options;
  }
  async uploadAsset(data, options) {
    const headers = options?.headers || {};
    return await new Promise((resolve, reject) => axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${this.options.baseUrl}/assets`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'x-api-key': `${this.options.apiKey}`,
        ...headers
      },
      data,
    }).then(async ({ data }) => {
      await immich.addAssetToAlbum([res.id]);
      const result = {
        url: `/api/immich/assets/${data.id}`,
        ...data
      }
      resolve(result);
    }).catch((err) => {
      reject(err);
    }));
  }
  async addAssetToAlbum(ids, options) {
    const headers = options?.headers || {};
    return await new Promise((resolve, reject) => axios.request({
      method: 'put',
      url: `${this.options.baseUrl}/albums/${CONSTANTS.IMMICH_SHARED_ALBUM_ID}/assets`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': `${this.options.apiKey}`,
        ...headers
      },
      data: {
        ids
      },
    }).then(({ data }) => {
      const result = {
        ...data
      }
      resolve(result);
    }).catch((err) => {
      reject(err);
    }));
  }
  async viewAsset(id, options) {
    const headers = options?.headers || {};
    return await new Promise((resolve, reject) => axios.request({
      method: 'get',
      url: `${this.options.baseUrl}/assets/${id}/thumbnail`,
      headers: {
        'Accept': 'application/octet-stream',
        'x-api-key': `${this.options.apiKey}`,
        ...headers
      },
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(err);
    }));
  }
}

export const immich = new Immich({
  baseUrl: CONSTANTS.IMMICH_URL,
  apiKey: CONSTANTS.IMMICH_API_KEY,
});
