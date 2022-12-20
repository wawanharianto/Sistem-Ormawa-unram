import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['uuid', 'username', 'email', 'role', 'profilePic']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getUsersbyUsername = async (req, res) => {
  const search = req.query.search || "";
  try {
    const response = await Users.findAll({
      attributes: ['uuid', 'username', 'email', 'role', 'profilePic'],
      where: {
        [Op.or]: [{username: {
          [Op.like]: '%'+search+'%'
        }}]
      }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const createUser = async (req, res) => {
  const { username, email, password, confPassword, role } = req.body;

  const user = await Users.findOne({
    where: {
      username: username
    }
  });

  if (user) return res.status(400).json({ msg: "Username telah digunakan" });

  if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirm password tidak sama" });

  const salt = await bcrypt.genSalt();
  const hashpassword = await bcrypt.hash(password, salt);

  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });


  file.mv(`./profilePic/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Users.create({
        username: username,
        email: email,
        password: hashpassword,
        profilePic: fileName,
        url: url,
        role: role,
      });
      res.json({ msg: "Register Berhasil" });
    } catch (error) {
      console.log(error);
    }
  })

}

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id
    }
  })

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  try {
    const filepath = `./profilePic/images/${user.profilePic}`;
    fs.unlinkSync(filepath);
    await Users.destroy({
      where: {
        id: user.id
      }
    });
    res.json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid : req.params.uuid
    }
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  const { username, email, password, confPassword, role } = req.body;

  let hashpassword;
  const salt = await bcrypt.genSalt();
  if (password === "" || password === null) {
    hashpassword = user.password
  } else {
    hashpassword = await bcrypt.hash(password, salt);
  }

  if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirm password tidak sama" });

  //Cek file image upload
  let fileName = "";
  if (req.files === null) {
    fileName = user.profilePic;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./profilePic/images/${user.profilePic}`;
    fs.unlinkSync(filepath);

    file.mv(`./profilePic/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Users.update({
      username: username,
      email: email,
      password: hashpassword,
      profilePic: fileName,
      url: url,
      role: role
    }, {
      where: {
        id: user.id
      }
    });
    res.json({ msg: "User Updated" });
  } catch (error) {
    console.log(error);
  }

}
