export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Calculator API',
    version: '1.0.0',
    description: 'A REST service that performs addition operations',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    '/calculator/add': {
      get: {
        summary: 'Add numbers',
        parameters: [
          {
            name: 'operands',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              description: 'Comma-separated list of numbers',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sum: {
                      type: 'number',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid input',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
