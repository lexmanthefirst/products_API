//User schema
module.exports = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'The auto-generated id of the user',
      readOnly: true,
    },
    name: {
      type: 'string',
      description: 'The name of the user',
      example: 'Solomon Grundy',
    },
    email: {
      type: 'string',
      description: 'Email of the user',
      example: 'exaple@user.com',
    },
    role: {
      type: 'string',
      enum: ['user', 'admin'],
      description: 'The role of the user',
      example: 'user',
    },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip: { type: 'string' },
        country: { type: 'string' },
      },
      example: '123 Applebay street',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date the user was created',
      readOnly: true,
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date the user was last updated',
      readOnly: true,
    },
  },
  required: ['name', 'email', 'address'],
};
