import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken) return res.sendStatus(401);
    
    const user = await Users.findAll({
      where: {
        akses_token: refreshToken
      }
    });

    if(!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err) return res.sendStatus(403);

      const uuid = user.uuid;
      const username = user.username;
      const email = user.email;
      const accessToken = jwt.sign({uuid, username, email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60s'
      });
      res.json({ accessToken });

    });
  } catch (error) {
    console.log(error);
  }
}