require('dotenv').config();
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const connectDB = require('./database/connect');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const setupSwagger = require('./swagger/swagger-config');
const MongoStore = require('connect-mongo');

const app = express();

// Middleware
app.use(
  cors({
    origin: 'https://products-api-5zdk.onrender.com',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (use a proper secret in production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 24 * 60 * 60, // 24 hours
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS-only in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Home route
app.get('/', (req, res) => {
  if (req.user) {
    console.log(`User ${req.user.username || req.user.name} is logged in`);
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

// Error handling and Swagger
app.use(errorMiddleware);
setupSwagger(app);

// Start server
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
