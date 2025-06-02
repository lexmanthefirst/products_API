require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const connectDB = require('./database/connect');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const setupSwagger = require('./swagger/swagger-config');

const app = express();

// Trust proxy for secure cookies behind Render's proxy
app.set('trust proxy', 1);

// CORS configuration
app.use(
  cors({
    origin: 'https://products-api-5zdk.onrender.com',
    credentials: true, //
  }),
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session config (with MongoDB)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Home route (for session testing)
app.get('/', (req, res) => {
  if (req.user) {
    console.log(
      `User ${
        req.user.username || req.user.name || req.user.displayName
      } is logged in`,
    );
  } else {
    console.log('No user is logged in');
  }

  res.send(
    req.user
      ? `Logged in as ${
          req.user.username ||
          req.user.name ||
          req.user.displayName ||
          'Unknown'
        }`
      : 'Logged Out',
  );
});

// API routes
app.use('/api/shop/v1', routes);

// Swagger UI and error middleware
setupSwagger(app);
app.use(errorMiddleware);

// Server startup
const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on: http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`Production URL: https://products-api-5zdk.onrender.com`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
