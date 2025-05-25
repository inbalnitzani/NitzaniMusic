import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

const isEmailAuthorized = (email) => {
  const allowed = process.env.ALLOWED_ADMIN_EMAILS?.split(",").map(e => e.trim());
  return allowed.includes(email);
};

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_SUCCESS_REDIRECT,
    failureRedirect: process.env.CLIENT_FAILURE_REDIRECT
  })
);

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    const email = req.user.emails?.[0]?.value;

    if (!isEmailAuthorized(email)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});

export default router;
