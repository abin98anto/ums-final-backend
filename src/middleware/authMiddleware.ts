import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// dotenv.config();

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET || "",
    (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;
      next();
    }
  );
};

export { verifyToken };
