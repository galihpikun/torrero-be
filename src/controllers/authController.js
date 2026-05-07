import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Berhasil ngambil users",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data users",
    });
  }
};
export const getUsersById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "User Ga Ditemukan",
      });
    }

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Berhasil ngambil users",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat mengambil data users",
    });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username,!email,!password) {
      return res.status(400).json({
        code: 400,
        message: "Belum diisi inputnya",
      });
    }
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (emailExists) {
      return res.status(400).json({
        code: 400,
        message: "Email sudah ada yang punya, Ubah lol",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPw,
      },
    });

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Berhasil register Data",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat push data",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!emailExists) {
      return res.status(401).json({
        code: 401,
        message: "Invalid Email or password, please reinput",
      });
    }

    const isPwValid = await bcrypt.compare(password, emailExists.password);

    if (!isPwValid) {
      return res.status(400).json({
        code: 401,
        message: "Invalid Email or password, please reinput",
      });
    }

    // Generate TOken
    const token = generateToken({ id: emailExists.id, email: emailExists.email, username: emailExists.username }, res);

    res.status(201).json({
      success:true,
      data:{
        user:{
          id: emailExists.id,
          email:emailExists.email,
          username: emailExists.username
        },
        token
      }
    })
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message || "Terjadi kesalahan saat push data",
    });
  }
};

export const logout = async (req,res) => {
  res.cookie("jwt","",{
    httpOnly: true,
    expires: new Date(0)
  })
  return res.status(200).json({
      code: 200,
      success: true,
      message: "Berhasil logout"
    });
}