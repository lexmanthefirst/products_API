const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productSchema = require('./schemas/productSchema');
const userSchema = require('./schemas/userSchema');
const categorySchema = require('./schemas/categorySchema');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API for ecom website',
      version: '1.0.0',
      description:
        'Complete API for e-commerce website with products, users, orders, carts, reviews, and categories',
    },
    servers: [
      {
        // url: 'http://localhost:3000/api/v1',
        url: 'https://products-api-5zdk.onrender.com/api/v1',
      },
    ],
    components: {
      schemas: {
        Product: productSchema,
        User: userSchema,
        Category: categorySchema,
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerDoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/api-docs.json', (req, res) => {
    res.json(specs);
  });
};
