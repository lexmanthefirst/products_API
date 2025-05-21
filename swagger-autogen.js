const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./routes/productRoute'];

const config = {
  info: {
    title: 'Products API',
    description: 'API for product information for an ecommerce website',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    schemas: require('./swagger/schemas/productSchema'),
  },
};

swaggerAutogen(outputFile, endpointsFiles, config);
