import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

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
  // Use absolute paths to ensure files are found in both local and Vercel environments
  apis: [
    path.join(process.cwd(), 'src/routes/*.ts'),
    path.join(process.cwd(), 'src/routes/*.js'),
    path.join(process.cwd(), 'src/dtos/*.ts'),
    path.join(process.cwd(), 'src/dtos/*.js'),
    path.join(process.cwd(), 'dist/routes/*.js'),
    path.join(process.cwd(), 'dist/dtos/*.js'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
