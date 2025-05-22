// productSchema.js
module.exports = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'The auto-generated id of the product',
      readOnly: true,
    },
    name: {
      type: 'string',
      description: 'The name of the product',
      example: 'Apple iPhone 13',
    },
    description: {
      type: 'string',
      description: 'The description of the product',
      example: 'Latest model of Apple iPhone with A15 Bionic chip',
    },
    quantity: {
      type: 'number',
      description: 'The quantity of the product in cart',
      example: 5,
    },
    category: {
      type: 'string',
      description: 'The category of the product',
      example: 'Electronics',
    },
    price: {
      type: 'number',
      description: 'The price of the product',
      example: 999.99,
    },
    image: [
      {
        type: 'string',
        description: 'The URL of the product image',
        example: 'https://example.com/image.jpg',
      },
    ],
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date the product was created',
      readOnly: true,
    },
    rating: {
      type: 'number',
      description: 'The rating of the product',
      example: 4.5,
      minimum: 0,
      maximum: 5,
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date the product was last updated',
      readOnly: true,
    },
  },
  required: ['name', 'quantity', 'price', 'image'],
};
