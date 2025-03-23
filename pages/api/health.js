import { CONSTANTS } from "components/Constants";
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const json = {
      status: 200,
      message: "OK",
    };
    res.status(200).json(json);
  } catch (err) {
    console.error(err);
  }
}
