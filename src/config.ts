export const config = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  service: {
    name: 'calculator-service',
    version: '1.0.0',
  },
};
