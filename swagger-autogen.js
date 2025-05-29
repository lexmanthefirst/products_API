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
  info: {
    title: 'Ecommerce API',
    description:
      'Complete API for e-commerce website with products, users, orders, carts, reviews, and categories',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    schemas: schemas,
    securitySchemes: {
      GitHubOauth: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            // Changed from implicit to authorizationCode
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
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
      GitHubOauth: ['user', 'products', 'categories'],
    },
  ],
};
swaggerAutogen(outputFile, endpointsFiles, config);
