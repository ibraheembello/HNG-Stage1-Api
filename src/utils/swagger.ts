import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HNG Stage 1 Profile Classification API',
      version: '1.0.0',
      description: 'API documentation for the demographic classification engine.',
      contact: {
        name: 'Ibraheem Bello',
        email: 'belloibrahimolawle@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://hng-stage1-api.vercel.app',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/dtos/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
