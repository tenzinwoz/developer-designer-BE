const express = require("express");
const router = express.Router();
const messages = require("../../constants/messages");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

//route :Post api/auth/
//Desc :APi to login user
//access :public
router.post(
  "/",
  check("email", messages.inValidEmail).isEmail(),
  check("password", messages.inValidPassword).notEmpty(),
  async (req, res) => {
    try {
      const { email, password } = req.body;

      //Error handling
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }
      //Fetch the user from db
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .send({ errors: [{ msg: messages.invalidCredientials }] });
      }
      //Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ errors: [{ msg: messages.invalidCredientials }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      //Create a jwt and send
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
      res.status(500).send("Server error");
    }
  }
);

//route :GET api/auth/
//Desc :APi to get logged in user
//access :Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).send({ errors: [{ msg: messages.noUser }] });
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Server error");
  }
});

module.exports = router;
