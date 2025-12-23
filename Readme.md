# NGL - Node.js API Server

A TypeScript-based Express.js server that provides various utility endpoints for testing, data persistence, and scheduled tasks.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Key Dependencies](#key-dependencies)
- [Learning Points](#learning-points)

## Project Overview

NGL is a Node.js API server built with Express.js that provides utility endpoints for:

- **Health Checks**: Ping endpoint to verify server is running
- **Time Operations**: Get current server time
- **Data Management**: Add and store data to files
- **Echo Service**: Echo back request payloads
- **Scheduled Tasks**: Spam/cron job operations
- **User-specific Operations**: User-based cron and spam services

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js v5.2.1
- **Task Scheduling**: node-cron v4.2.1
- **HTTP Client**: axios v1.13.2
- **Environment Management**: envf v3.1.1
- **Build Tool**: TypeScript Compiler (tsc)
- **Development**: tsx (TypeScript executor)



## Development

### Start Development Server (with auto-reload)

```bash
npm run dev
```

### Build TypeScript

```bash
npm run build
```

### Run Compiled Code

```bash
npm run run
```

### Start Production Server

```bash
npm start
```

## API Endpoints

### 1. **Health Check**

- **Endpoint**: `GET /api/ping`
- **Purpose**: Verify server is running
- **Response**: `{ message: "pong" }`

### 2. **Server Time**

- **Endpoint**: `GET /api/time`
- **Purpose**: Get current server timestamp
- **Response**: `{ timestamp: "..." }`

### 3. **Echo Service**

- **Endpoint**: `POST /api/echo`
- **Purpose**: Echo back the request body
- **Body**: Any JSON data
- **Response**: Echoed data

### 4. **Data Addition**

- **Endpoint**: `POST /api/add`
- **Purpose**: Add data to a file
- **Body**:
  ```json
  {
    "fileName": "filename.json",
    "payload": {
      /* your data */
    }
  }
  ```
- **Response**: `{ status: 202, data: "added" }`

### 5. **Spam/Batch Operation**

- **Endpoint**: `GET /api/spam?username=<username>`
- **Purpose**: Execute spam/batch operations for a user
- **Query Params**: `username` (string)
- **Response**: `{ status: 202, ... }`

### 6. **User Cron Job**

- **Endpoint**: `GET /api/user/:username`
- **Purpose**: Execute scheduled cron jobs for specific user
- **Route Params**: `username` (string)
- **Response**: `{ status: 202, ... }`

### 7. **Questions Data**

- **Endpoint**: `GET /api/questions`
- **Purpose**: Retrieve questions from JSON file
- **Response**: Questions array from `src/data/questions.json`

### 8. **Root Endpoint**

- **Endpoint**: `GET /`
- **Response**: `{ message: "Hello from server" }`

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment (development/production)
```

The `envf` package automatically loads these variables from `.env` file.

## Scripts

```bash
npm run dev    # Watch mode development (tsx --watch)
npm run build  # Compile TypeScript to JavaScript
npm run run    # Build and run compiled code
npm start      # Start production server
npm test       # Run tests (not configured yet)
```

## Key Dependencies

### Production

- **express**: Web framework for routing and middleware
- **axios**: Promise-based HTTP client for making requests
- **node-cron**: Task scheduler for automated jobs
- **envf**: Environment variable loader

### Development

- **typescript**: Static type checking for JavaScript
- **tsx**: Execute TypeScript files directly without compilation
- **@types/node**: TypeScript definitions for Node.js
- **@types/axios**: TypeScript definitions for axios

## Learning Points

### Architecture Patterns

1. **MVC Pattern**: Separation of concerns with Controllers, Services, and Routes
2. **Middleware**: Express middleware for parsing JSON and URL-encoded data
3. **Error Handling**: Async handler wrapper for error management
4. **Repository Pattern**: Data layer abstraction

### Key Concepts to Study

1. **Express.js Routing**: How routes are defined and mapped
2. **TypeScript in Node.js**: Type safety and compilation
3. **Async/Await**: Handling asynchronous operations
4. **Environment Variables**: Configuration management with `envf`
5. **Cron Jobs**: Task scheduling with `node-cron`
6. **File Operations**: Reading/writing to JSON files
7. **Status Codes**: HTTP status codes (202 for accepted, 200 for success, 404 for not found)

### Common Patterns Used

- **202 Accepted**: Used for async operations (spam, cron, add endpoints)
- **Async Handler Wrapper**: Centralized error handling
- **Service Layer**: Decoupling business logic from routes
- **Environment-based Configuration**: Using `.env` for different environments

## Next Steps for Learning

1. Examine `app.controllers.ts` to understand request handling
2. Check `app.services.ts` to see business logic implementation
3. Review the `repo/` folder for data persistence patterns
4. Study how `node-cron` schedules tasks in the cron service
5. Explore error handling in the async handler

## Running the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

The server will start on the port specified in `.env` (default: 3000) and output:

```
Server is running on port 3000
```

---

**Note**: This project uses ES modules (`"type": "module"` in package.json) and TypeScript for type safety.
