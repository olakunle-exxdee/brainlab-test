import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { CalculatorService } from './services/calculator';
import { swaggerDocument } from './swagger';
import logger from './utils/logger';
import { config } from './config';

const app = express();
const calculator = new CalculatorService();

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/calculator/add', (req: Request, res: Response) => {
  try {
    const operands = req.query.operands as string;
    if (!operands) {
      return res.status(400).json({
        error: 'Missing required parameter: operands',
        example: '/calculator/add?operands=1,2,3',
      });
    }

    logger.info(`Processing addition request with operands: ${operands}`);

    const sum = calculator.add(operands);
    logger.info(`Calculation successful. Result: ${sum}`);

    res.json({ sum });
  } catch (error) {
    logger.error(`Error processing request: ${(error as Error).message}`);
    res.status(400).json({ error: (error as Error).message });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: config.service.name,
    version: config.service.version,
  });
});

// Handle 404 - Route not found
app.use((req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.method} ${req.url} does not exist`,
    availableRoutes: [
      'GET /calculator/add?operands=<numbers>',
      'GET /health',
      'GET /api-docs',
    ],
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  });
});

app.listen(config.server.port, () => {
  logger.info(`Server is running on port ${config.server.port}`);
});
