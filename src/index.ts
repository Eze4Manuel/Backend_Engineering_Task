
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './database/db';
import products from './routes/products';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/products', products);

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`Server running on port ${port}`));