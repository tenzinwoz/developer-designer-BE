import express from "express";
const router = express.Router();
import { messages } from "../../constants/messages.js";
import { check, validationResult } from "express-validator";
import { auth } from "../../middleware/auth.js";
import { Profile } from "../../models/Profile.js";

//route :PUT api/profile/
//Desc :APi to create/update profile
//access :Private
router.put(
  "/",
  [
    auth,
    check("headline", messages.headlineRequired).notEmpty(),
    check("skills", messages.skillsRequired).notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send(errors);
      }

      //TODO
      //Find a better way push into array
      //Can i use the same api or have to use api to upload in array

      //Update if found or else Insert into db
      const profile = await Profile.updateOne(
        { user: req.user.id },
        {
          $set: { ...req.body },
        },
        { upsert: true }
      );

      res.send(profile);
    } catch (error) {
      res.status(500).send("server error");
    }
  }
);

//route :GET api/profile/
//Desc :APi to get user profile
//access :Private
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(400).send({ errors: [{ msg: messages.noProfile }] });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).send("server error");
  }
});

export { router as profileRoute };
