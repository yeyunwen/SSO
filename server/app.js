import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import session from "express-session";
import fs from "node:fs";

const appToUrlMap = {
  //A应用id vue-project
  Rs6s2aHi: {
    url: "http://localhost:5173", //对应的应用地址
    secretKey: "%Y&*VGHJKLsjkas", //对应的secretKey
    token: "", //token
  },
  //B应用id react-project
  "9LQ8Y3mB": {
    url: "http://localhost:5174", //对应的应用地址
    secretKey: "%Y&*FRTYGUHJIOKL", //对应的secretKey
    token: "", //token
  },
};

const genToken = (appId) => {
  return jwt.sign({ appId }, appToUrlMap[appId].secretKey, {
    expiresIn: "1h",
  });
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "adwdawd",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.get("/login", (req, res) => {
  if (req.session.username) {
    const appId = req.query.appId;
    const url = appToUrlMap[appId].url;
    let token;
    if (appToUrlMap[appId].token) {
      token = appToUrlMap[appId].token;
    } else {
      token = genToken(appId);
      appToUrlMap[appId].token = token;
    }
    res.redirect(`${url}?token=${token}`);
    return;
  }
  const ssoHtml = fs.readFileSync("../sso.html", "utf-8");
  res.send(ssoHtml);
});

app.get("/protectd", (req, res) => {
  const { username, password, appId } = req.query;
  const token = genToken(appId);
  req.session.username = username;
  const redirectUrl = appToUrlMap[appId].url;

  res.redirect(`${redirectUrl}?token=${token}`);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
