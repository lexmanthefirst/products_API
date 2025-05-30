const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = [
  './routes/productRoute',
  './routes/userRoute',
  './routes/categoryRoute',
  './routes/authRoute',
];
const path = require('path');

const fs = require('fs');
const schemasDir = path.join(__dirname, 'swagger', 'schemas');
const schemaFiles = fs
  .readdirSync(schemasDir)
  .filter(file => file.endsWith('.js'));

const schemas = {};
schemaFiles.forEach(file => {
  const schemaName = file.replace('.js', '');
  schemas[schemaName] = require(path.join(schemasDir, file));
});

const config = {
  openapi: '3.0.0',
  info: {
    title: 'Ecommerce API',
    description:
      'Complete API for e-commerce website with products, users, orders, carts, reviews, and categories',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'https://products-api-5zdk.onrender.com/api/shop/v1',
      description: 'Local server',
    },
  ],
  components: {
    schemas: schemas,
    securitySchemes: {
      GitHubOauth: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github',
            tokenUrl:
              'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github/callback',
            refreshUrl:
              'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github/callback',
            scopes: {
              user: 'Access user data',
              products: 'Access product data',
              categories: 'Access category data',
            },
          },
        },
      },
    },
  },
  security: [
    {
      GitHubOauth: ['user'],
    },
  ],
};
swaggerAutogen(outputFile, endpointsFiles, config);
