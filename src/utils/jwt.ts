import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;

// export const generateAccessToken = (userId: string) => {
//   return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15m" });
// };

// export const generateRefreshToken = (userId: string) => {
//   return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: "7d" });
// };

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret);
};

export const generateAccessToken = (id: string, role: "user" | "admin") => {
  return jwt.sign({ id, role }, accessTokenSecret as string, {
    expiresIn: "15m", // Adjust token expiration as needed
  });
};

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, refreshTokenSecret as string, {
    expiresIn: "7d", // Adjust token expiration as needed
  });
};
