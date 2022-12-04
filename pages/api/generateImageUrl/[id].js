import internal from "components/internal";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({
      code: "bad_request",
      message: "Bad Request",
    });
  }
  const { id, ...query } = req.query;
  try {
    let response = await internal.assets.image.get(id, {
      params: {
        ...query,
        o: 0,
      },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
