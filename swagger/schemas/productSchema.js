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
    quantity: {
      type: 'number',
      description: 'The quantity of the product in cart',
      example: 5,
    },
    price: {
      type: 'number',
      description: 'The price of the product',
      example: 999.99,
    },
    image: {
      type: 'string',
      description: 'The URL of the product image',
      example: 'https://example.com/image.jpg',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date the product was created',
      readOnly: true,
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
