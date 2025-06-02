// swagger/schemas/userSchema.js
module.exports = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      description: 'The auto-generated ID of the user',
      readOnly: true,
    },
    name: {
      type: 'string',
      description: 'Full name of the user',
      example: 'Solomon Grundy',
    },
    email: {
      type: 'string',
      description: 'Email address of the user',
      example: 'example@user.com',
    },
    provider: {
      type: 'string',
      enum: ['google', 'github', 'email'],
      description: 'The authentication provider for the user',
      example: 'google',
    },
    role: {
      type: 'string',
      enum: ['user', 'admin'],
      description: 'User role in the system',
      example: 'user',
    },
    githubId: {
      type: 'string',
      description: 'GitHub OAuth ID (if authenticated via GitHub)',
      example: '9876543210',
      nullable: true,
    },
    googleId: {
      type: 'string',
      description: 'Google OAuth ID (if authenticated via Google)',
      example: '10987654321',
      nullable: true,
    },
    address: {
      type: 'object',
      description: 'Optional user address',
      properties: {
        street: { type: 'string', example: '123 Applebay Street' },
        city: { type: 'string', example: 'Gotham' },
        state: { type: 'string', example: 'New York' },
        zip: { type: 'string', example: '10001' },
        country: { type: 'string', example: 'USA' },
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      readOnly: true,
      description: 'Timestamp when the user was created',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      readOnly: true,
      description: 'Timestamp when the user was last updated',
    },
  },
  required: ['name', 'email', 'provider'],
};
