# Calculator REST Service

A TypeScript-based REST service that performs addition on a given input of numbers.

## Features

- REST API for addition operations
- API Documentation (Swagger/OpenAPI)
- Security headers (Helmet)
- Rate limiting
- Health check endpoint
- Comprehensive logging
- Configuration management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Service

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

The service will be available at `http://localhost:3000`

## API Documentation

Swagger documentation is available at `http://localhost:3000/api-docs`

## Running Tests

```bash
npm test
```

## API Usage

### Addition Endpoint

```http
GET /calculator/add?operands=<numbers>
```

Example requests:

- `GET /calculator/add?operands=7,-7` → `{ "sum": 0 }`
- `GET /calculator/add?operands=42` → `{ "sum": 42 }`

The `operands` parameter should be a comma-separated list of numbers.

### Health Check

```http
GET /health
```

Returns the service status and version information.
