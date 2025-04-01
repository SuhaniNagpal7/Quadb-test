const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const blockchainRoutes = require('./routes/blockchain');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blockchain', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connected to MongoDB');
    
    // Drop blocks collection if it exists to start fresh
    try {
        await mongoose.connection.db.collection('blocks').drop();
        console.log('Blocks collection dropped successfully');
    } catch (error) {
        // If collection doesn't exist, this is fine, just continue
        console.log('No blocks collection to drop or other error:', error.message);
    }
    
    // Start server after DB operations
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/blockchain', blockchainRoutes); 