"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI || '');
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
};
exports.default = connectDB;
