"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./database/db");
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '3mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/products', products_1.default);
// Connect to MongoDB
(0, db_1.connectDB)();
// Start the server
const port = process.env.PORT || 5004;
app.listen(port, () => console.log(`Server running on port ${port}`));
