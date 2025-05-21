require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./database/connect');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const setupSwagger = require('./swagger/swagger-config');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/products', productRoute);
app.use('/api/v1/products', productRoute);

app.use(errorMiddleware);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5500;
// Swagger setup
setupSwagger(app);
// Create server
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
