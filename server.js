require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./database/connect');
const routes = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');
const setupSwagger = require('./swagger/swagger-config');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/v1', routes);

// Error handling middleware and swagger setup
app.use(errorMiddleware);
setupSwagger(app);

// Create server
const PORT = process.env.PORT || 8080;
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `Swagger documentation is available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
startServer();
