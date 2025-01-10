# Product Management API

A RESTful API built with Express.js, TypeScript, and SQLite for managing products. This API provides CRUD operations with filtering capabilities and data persistence.

## Features

- Full CRUD operations for products
- Data persistence using SQLite
- Input validation
- Error handling
- Search and filter capabilities
- TypeScript for type safety
- Express.js for routing and middleware

## Testing

You can use the `Product management.postman_collection` file to import into Postman for testing the API endpoints. This collection includes all the necessary requests to interact with the API.

## Prerequisites

- Node.js (v18 or higher)
- TypeScript (v5.7.3 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Configuration

The application uses SQLite as its database. The database file (`database.sqlite`) will be created automatically in the project root directory when you first run the application.

## Development

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
```

## Production

Build and start for production:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Endpoints

### Create Product

- **POST** `/api/products`
- Creates a new product
- Request Body:

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99
}
```

### List Products

- **GET** `/api/products`
- Returns all products with optional filtering
- Query Parameters:
  - `search`: Search in name and description
  - `minPrice`: Filter by minimum price
  - `maxPrice`: Filter by maximum price
- Example: `/api/products?search=phone&minPrice=100&maxPrice=1000`

### Get Product Details

- **GET** `/api/products/:id`
- Returns details of a specific product
- URL Parameters:
  - `id`: Product ID

### Update Product

- **PUT** `/api/products/:id`
- Updates an existing product
- URL Parameters:
  - `id`: Product ID
- Request Body (all fields optional):

```json
{
  "name": "Updated Name",
  "description": "Updated Description",
  "price": 149.99
}
```

### Delete Product

- **DELETE** `/api/products/:id`
- Deletes a product
- URL Parameters:
  - `id`: Product ID

## Validation Rules

- Product Name:
  - Required
  - Maximum 100 characters
- Description:
  - Optional
  - Maximum 500 characters
- Price:
  - Required
  - Must be a positive number

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Resource created
- `204`: Resource deleted
- `400`: Bad request (validation error)
- `404`: Resource not found
- `500`: Server error

Error responses include descriptive messages:

```json
{
  "error": "Error message"
}
```

## Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── repositories/   # Database operations
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
├── utils/          # Utility functions
├── validators/     # Input validation
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the project
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint issues
- `npm run format`: Format code with Prettier
- `npm run clean`: Remove build directory

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
