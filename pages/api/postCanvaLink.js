import internal from "components/internal";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({
      code: "bad_request",
      message: "Bad Request",
    });
  }

  try {
    let response = await internal.content.item.canva_links({
      method: "POST",
      data: {
        data: req.body,
      },
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.response.data);
  }
}
