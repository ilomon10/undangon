import axios from "axios";
import { CONSTANTS } from "components/Constants";

export default async function handler(req, res) {
  try {
    const response = await axios(
      `${CONSTANTS.SERVER_URL}/api/content/item/templates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "API-898dfe3ca220d11ede28f5a597bf3521ae6be300",
        },
        data: {
          data: {
            name: "Template 1",
            content: "",
            category: "6e99527762613246d800000b",
          },
        },
      }
    );
    const json = await response.data;
    res.status(response.status).json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
}
