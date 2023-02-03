import internal from "components/internal";

export const getComments = async ({ params }) => {
  const response = await internal.content.items.comments({
    params,
  });
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
    let response = await getComments({ params: req.query });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(500).json(err.response.data);
  }
}
