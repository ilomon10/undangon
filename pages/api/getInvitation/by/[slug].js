import internal from "components/internal";

export const getInvitationBySlug = async (slug, params = {}) => {
  let response = await internal.content.item.invitations({
    params: {
      ...params,
      filter: {
        slug: slug,
      },
    },
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
    let response = await getInvitationBySlug(req.query.slug);
    res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}
