module.exports = {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      example: '507f1f77bcf86cd799439012',
      description: 'Auto-generated ID of the category',
    },
    name: {
      type: 'string',
      required: true,
      example: 'Electronics',
      description: 'Unique category name',
    },
    description: {
      type: 'string',
      example: 'Devices and gadgets',
      description: 'Brief category description',
    },
    slug: {
      type: 'string',
      example: 'electronics',
      description: 'URL-friendly version of name',
    },
    parentCategory: {
      type: 'string',
      example: 'Computers',
      description: 'Reference to parent category (for hierarchies)',
    },
    isActive: {
      type: 'boolean',
      default: true,
      example: true,
      description: 'Toggle category visibility',
    },
    featuredImage: {
      type: 'string',
      example: 'https://example.com/cat-electronics.jpg',
      description: 'Main category image URL',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2023-01-01T00:00:00Z',
      description: 'Auto-generated creation timestamp',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2023-01-02T00:00:00Z',
      description: 'Auto-generated update timestamp',
    },
  },
  required: [
    'name',
    'description',
    'slug',
    'parentCategory',
    'isActive',
    'featuredImage',
  ],
};
