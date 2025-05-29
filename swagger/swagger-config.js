const swaggerDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productSchema = require('./schemas/productSchema');
const userSchema = require('./schemas/userSchema');
const categorySchema = require('./schemas/categorySchema');
require('dotenv').config();

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
        url: 'http://localhost:3000/api/v1',
        // url: 'https://products-api-5zdk.onrender.com/api/v1',
      },
    ],
    components: {
      schemas: {
        Product: productSchema,
        User: userSchema,
        Category: categorySchema,
      },
      securitySchemes: {
        GitHubOauth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://github.com/login/oauth/authorize',
              tokenUrl: 'https://github.com/login/oauth/access_token',

              scopes: {
                user: 'Access user profile',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerDoc(options);

module.exports = app => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      swaggerOptions: {
        oauthRedirectUrl: `${process.env.BASE_URL}/api-docs/oauth2-redirect.html`,
        oauth: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          scopes: ['user'],
        },
      },
    }),
  );
  app.get('/api-docs.json', (req, res) => {
    res.json(specs);
  });
};
