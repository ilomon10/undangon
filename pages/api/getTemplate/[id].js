import internal from "components/internal";

export const getTemplate = async (options, id) => {
  let response = await internal.content.item.templates(options, id);
  return response;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({
      code: "bad_request",
      message: "Bad Request",
    });
  }

  try {
    let response = await getTemplate({}, req.query.id);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json(err.response.data);
  }
}
