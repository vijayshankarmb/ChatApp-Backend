import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { User } from "../modules/user/user.model";

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = verifyAccessToken(token) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    req.user = user;
    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
};
