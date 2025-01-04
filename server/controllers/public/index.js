import express from "express";
import config from "config";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User.js";
import sendEmail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const KEY = config.get("JWT_KEY");
const URL = config.get("SERVER_URL");


router.post("/register", async (req, res) => {
  try {
    let {
      role_type,
      user_view_type,
      userName,
      company,
      phone,
      email,
      password,
      location,
      hireable,
      twitter_username,
      followers,
      following,
    } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ msg: "Email is already exists" });
    }
    let hashedPass = await bcrypt.hash(password, 10);

    let emailToken = Math.random().toString(36).substring(2);
    let phoneToken = Math.random().toString(36).substring(2);

    console.log(emailToken, phoneToken);

    const newUser = {
      role_type,
      user_view_type,
      userName,
      company,
      phone,
      email,
      password: hashedPass,
      location,
      hireable,
      twitter_username,
      followers,
      following,
      userVerifyToken: {
        email: emailToken,
        phone: phoneToken,
      },
    };

    await userModel.create(newUser);

    let emailData = {
      from: "Github",
      subject: "Email Verifications",
      to: email,
      html: `http://localhost:2025/api/public/emailverify${emailToken} `,
    };

    // sendEmail(emailData);

    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    // console.log(`${URL}/api/public/phoneverify/${phoneToken}`);

    res
      .status(200)
      .json({
        msg: "Please verify link and registered as github user. Please verify your email and phone",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.get("/emailverify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let user = await userModel.findOne({ "userVerifyToken.email": token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email token." });
    }
    user.userVerified.email = true;
    user.userVerifyToken.email = null;
    await user.save();

    res.status(200).json({ msg: "Email verified successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/phoneverify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let user = await userModel.findOne({ "userVerifyToken.phone": token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid phone token." });
    }
    user.userVerified.phone = true;
    user.userVerifyToken.phone = null;
    await user.save();

    res.status(200).json({ msg: "Phone verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // password is plain text password : samid.123
    // password = samid.123

    let user = await userModel.findOne({ email: email });
    // console.log(user)
      if (user == null) {
        return res.status(400).json({ msg: "Invalid user or token" });
      }

    //  console.log(user);

                                    // samid.123 // '$2b$10$CB2rHCz48AwFuJfnV94RTeGFed6EBInP4ElgrLU/J57sRldsAFOfm',
      let check = await bcrypt.compare(password, user.password);
      // console.log(check)

      if (check == false) {
        return res.status(400).json({ msg: "Invalid password"});
      }

      let userEmail = user.email; 

      const token = jwt.sign({userEmail},KEY,{expiresIn:"1h"});
      console.log(token)

      res.status(200).json({ msg: "LoggedIn successfully ", userToken:token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
