import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.json({
    message: "Sign up route",
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "login route",
  });
});

router.post("/logout", (req, res) => {
  res.json({
    message: "logout route",
  });
});

router.post("/authUser", (req, res) => {
  res.json({
    message: "authUser route",
  });
});

export default router;
