import { CONSTANTS } from "components/Constants";
import fetch from "node-fetch";

export default async function handler(req, res) {

  try {
    const response = await fetch(
      `${CONSTANTS.SERVER_URL}/api/content/items/templates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": "API-898dfe3ca220d11ede28f5a597bf3521ae6be300",
        },
      }
    );
    const json = await response.json();
    res.status(response.status).json(json);
  } catch (err) {
    console.error(err);
  }
}
