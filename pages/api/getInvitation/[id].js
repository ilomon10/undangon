import internal from "components/internal";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({
      code: "bad_request",
      message: "Bad Request",
    });
  }

  try {
    let response = await internal.content.item.invitations({}, req.query.id);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json(err.response.data);
  }
}
