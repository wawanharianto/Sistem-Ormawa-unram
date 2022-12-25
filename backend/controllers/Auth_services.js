import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) return res.status(400).json({ msg: "Password Salah" });

    req.session.userId = user.uuid;

    const uuid = user.uuid;
    const username = user.username;
    const email = user.email;
    const role = user.role;

    const accessToken = jwt.sign({ uuid, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    const refreshToken = jwt.sign({ uuid, username, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    await Users.update({ akses_token: refreshToken }, {
      where: {
        uuid: uuid
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //ini waktu dalam satu hari di convert ke milisecond
      //secure: true //ini di aktifkan jika nanti menggunakan https
    });

    res.json({ accessToken, username, email, role });

  } catch (error) {
    console.log(error);
  }
}

export const getcurrentloginUser = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login ke Akun Anda!" });
  }
  const user = await Users.findOne({
    attributes: ['id', 'uuid', 'username', 'email', 'role', 'akses_token', 'url'],
    where: {
      uuid: req.session.userId
    }
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  res.status(200).json(user);
}

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if(err) return res.status(400).json({msg: "Tidak dapat logout"});
  })

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findAll({
    where: {
      akses_token: refreshToken
    }
  });

  if (!user[0]) return res.sendStatus(204);

  const userid = user[0].id;

  await Users.update({ akses_token: null }, {
    where: {
      id: userid
    }
  });

  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}