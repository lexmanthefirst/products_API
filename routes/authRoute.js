const express = require('express');
const passport = require('passport');
const router = express.Router();

//login with GitHub
router.get('/github', passport.authenticate('github'));

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
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
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
