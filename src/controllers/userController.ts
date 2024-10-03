import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import { verifyAccessToken } from "../utils/jwt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, photo } = req.body;
    const imageURL = photo;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      imageURL,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req: any, res: any) => {
  const { id, name, email, imageURL } = req.body;
  const userId = id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, imageURL },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: any, res: any) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("getting user profile...");
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
    if (!token) {
      res.sendStatus(401); // Unauthorized if no token is present
      return;
    }

    const decoded = verifyAccessToken(token);
    const userId = decoded;

    // Fetch the user from the database
    const user = await User.findById(userId).select("-password"); // Exclude password from response
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // Send user data as response
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      imageURL: user.imageURL,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.sendStatus(500);
    return;
  }
};
