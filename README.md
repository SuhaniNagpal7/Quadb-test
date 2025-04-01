# Blockchain Simulation

A full-stack blockchain simulation application with a modern web interface.

## Features

- Block creation with index, timestamp, transactions, and hashes
- SHA-256 hashing for block integrity
- Chain validation to detect tampering
- Simple proof-of-work mechanism
- Transaction management
- Modern React frontend with Material-UI
- RESTful API backend
- MongoDB database
- Docker containerization

## Project Structure

```
.
├── frontend/           # React frontend application
├── backend/           # Node.js backend application
├── docker-compose.yml # Docker Compose configuration
└── README.md         # Project documentation
```

## Requirements

- Node.js 16.0 or higher
- Docker and Docker Compose
- MongoDB (if running locally)

## Running with Docker

1. Clone this repository
2. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## Running Locally

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blockchain
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/blockchain/init` - Initialize blockchain with genesis block
- `GET /api/blockchain/chain` - Get entire blockchain
- `POST /api/blockchain/block` - Add new block with transactions
- `GET /api/blockchain/validate` - Validate chain integrity
- `GET /api/blockchain/block/:index` - Get block by index

## Frontend Features

- Real-time blockchain visualization
- Transaction creation form
- Chain validation status
- Block details display
- Responsive Material-UI design

## Development

### Backend

The backend is built with:
- Node.js
- Express
- MongoDB with Mongoose
- TypeScript

### Frontend

The frontend is built with:
- React
- TypeScript
- Material-UI
- Axios for API calls

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 