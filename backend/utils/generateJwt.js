import jwt from "jsonwebtoken";

export const generateJwt = (userId, res) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 10000,
    httpOnly: true,
    sameSite: "strict",
    secure: String(process.env.NODE_ENV) !== "development",
  });
};
