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
        url: 'https://products-api-5zdk.onrender.com/api/shop/v1',
      },
    ],
    components: {
      schemas: {
        Product: productSchema,
        User: userSchema,
        Category: categorySchema,
      },
      securitySchemes: {
        GitHubOAuth: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl:
                'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github',
              tokenUrl:
                'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github/callback',
              scopes: {
                user: 'Access user profile',
                products: 'Access product data',
                categories: 'Access category data',
              },
              refreshUrl:
                'https://products-api-5zdk.onrender.com/api/shop/v1/auth/github/callback',
            },
          },
        },
      },
    },
    security: [
      {
        GitHubOAuth: ['user'],
      },
    ],
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
        oauth: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          scopes: ['user'],
          usePkceWithAuthorizationCodeGrant: true,
          redirectUrl:
            'https://products-api-5zdk.onrender.com/api-docs/oauth2-redirect.html',
        },
        url: 'https://products-api-5zdk.onrender.com/api-docs.json',
      },
    }),
  );
  app.get('/api-docs.json', (req, res) => {
    res.json(specs);
  });
};
