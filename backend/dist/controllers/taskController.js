"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.addTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to get tasks' });
    }
};
exports.getTasks = getTasks;
const addTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task_1.default({ title });
        await task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add task' });
    }
};
exports.addTask = addTask;
const updateTask = async (req, res) => {
    try {
        const task = await Task_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update task' });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        await Task_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete task' });
    }
};
exports.deleteTask = deleteTask;
