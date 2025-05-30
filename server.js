require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const connectDB = require('./database/connect');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const setupSwagger = require('./swagger/swagger-config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get('/', (req, res) => {
  res.send(
    req.session.user
      ? `Logged in as ${req.session.user.displayName}`
      : 'Logged Out',
  );
});

// API routes
app.use('/api/shop/v1', routes);

// Error handling and Swagger
app.use(errorMiddleware);
setupSwagger(app);

// Start server
const PORT = process.env.PORT || 8080;
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(
        `Server is running at https://products-api-5zdk.onrender.com`,
      );
      console.log(`Swagger: https://products-api-5zdk.onrender.com/api-docs`);
      console.log(
        `GitHub OAuth callback:https://products-api-5zdk.onrender.com/api/shop/v1/auth/github/callback`,
      );
      //logging in with github authentication
      console.log(
        `Github Oauth login: https://products-api-5zdk.onrender.com/api/shop/v1/auth/github`,
      );
      //Logging out
      console.log(
        `Logout: https://products-api-5zdk.onrender.com/api/shop/v1/auth/logout`,
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}
startServer();
