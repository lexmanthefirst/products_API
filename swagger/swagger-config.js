const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productSchema = require('./schemas/productSchema');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product information API for ecom website',
      version: '1.0.0',
      description: 'API for product information',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        url: 'https://products-api-8a3v.onrender.com/api/v1',
      },
    ],
    components: {
      schemas: {
        Product: productSchema,
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
