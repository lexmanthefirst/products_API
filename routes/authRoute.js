const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * /auth/github:
 *   get:
 *     tags: [Auth]
 *     summary: Login with GitHub (OAuth2)
 *     description: Initiates GitHub OAuth2 flow
 *     security:
 *       - GitHubOAuth: []  # Reference the security scheme
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication
 */
//login with GitHub
router.get('/github', passport.authenticate('github'));

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Login with Google (OAuth2)
 *     description: Initiates Google OAuth2 flow
 *     security:
 *       - GoogleOAuth: []  # Reference the security scheme
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication
 */
//login with Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags: [Auth]
 *     summary: GitHub OAuth2 Callback
 *     description: Handles the OAuth2 callback from GitHub
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from GitHub
 *     responses:
 *       302:
 *         description: Redirects to homepage on success
 */
// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags: [Auth]
 *     summary: Google OAuth2 Callback
 *     description: Handles the OAuth2 callback from Google
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *     responses:
 *       302:
 *         description: Redirects to homepage on success
 */
// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
  }),
  (req, res) => {
    res.redirect('/');
  },
);
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logout user
 *     description: Destroys session and logs out user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
