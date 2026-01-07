import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { setAuthCookies, clearAuthCookies } from "../../utils/cookie";

export const register = async (req: Request, res: Response) => {

  const user = await registerUser(req.body);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  setAuthCookies(res, { accessToken, refreshToken });

  return res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const user = await loginUser(req.body);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  setAuthCookies(res, { accessToken, refreshToken });

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    },
  });
};

export const logout = async (_req: Request, res: Response) => {
  clearAuthCookies(res);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMe = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: {
      user: req.user, // injected by auth middleware
    },
  });
};
