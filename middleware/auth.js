import jwt from "jsonwebtoken";
import { messages } from "../constants/messages.js";
import config from "config";

export const auth = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res
      .status(401)
      .send({ errors: [{ msg: messages.authorizationDenied }] });
  }
  try {
    const decoded = await jwt.verify(token, config.get("jwtSecret"));
    if (decoded?.user) {
      req.user = decoded.user;
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ errors: [{ msg: messages.authorizationDenied }] });
  }
};
