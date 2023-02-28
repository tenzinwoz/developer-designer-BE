const express = require("express");
const router = express.Router();
const messages = require("../../constants/messages");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

//route :Post api/auth/
//Desc :APi to login user
//access :public
router.post("/", (req, res) => {});

module.exports = router;
