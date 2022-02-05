import { Client } from "components";

const method = {
  GET: ({ params }) => {
    return Client.comments({
      params
    });
  },
  POST: ({ params, data }) => {
    return Client.comments({
      method: "POST",
      params,
      data
    });
  }
}

export default async function handler(req, res) {
  if (!method[req.method])
    return res.status(400).json({
      code: "bad_request",
      message: "Bad Request"
    });

  try {
    const comments = await method[req.method]({
      params: req.query,
      data: req.body
    });
    res.status(comments.status).json(comments.data);
  } catch (err) {
    res.status(500).json(err.response.data);
  }
}