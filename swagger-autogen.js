const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./routes/productRoute', './routes/userRoute'];
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
  },
};

swaggerAutogen(outputFile, endpointsFiles, config);
