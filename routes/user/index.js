import express from "express";
const router = express.Router();
import { messages } from "../../constants/messages.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import jwt from "jsonwebtoken";
import config from "config";

//route :Post api/user/register
//Desc :APi to create a user
//access :public
router.post(
  "/register",
  check("fullName", messages.fullNameRequired).notEmpty(),
  check("email", messages.inValidEmail).isEmail(),
  check("password", messages.inValidPassword).isLength({ min: 6 }),
  async (req, res) => {
    try {
      const { fullName, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }

      //Check if user exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ errors: [{ msg: messages.userExist }] });
      }

      //Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create an instance of new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      //Save to DB
      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      //Crate a jwt and send
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1h" },
        (error, token) => {
          if (error) throw error;
          res.send({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

export { router as userRoute };
