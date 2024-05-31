import Task from "../models/Task.js";
import messageFormat from "../config/message.js";
import { getPagination } from "../helpers/getPagination.js";

export const createTask = async(req, res) => {

    if(!req.body.title){
        return res.status(400).send({message: 'Content cannot be empty'});
    }
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false,
        });
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};

export const findAllTasks = async (req, res) => {
    try {
        const { size, page, title } = req.body;
        const condition = title ? {
            title: {$regex: new RegExp(title), $options: "i"},
        } : {};

        const { limit, offset} = getPagination(page,size);

        const data = await Task.paginate(condition, { offset, limit });
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.Page
        });
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};

export const findOneTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).json({message: `Task with id ${req.params.id} does not exist`});
        }
        res.json(task);
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};

export const findAllDoneTasks = async (req, res) =>{
    try {
        const task = await Task.find({ done: true });
        res.json(task);
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};

export const deleteTask = async (req, res) =>{
    try {
        const data = await Task.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};

export const updateTask = async (req, res) =>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedTask);
    } catch (error) {
        messageFormat(error.message, "danger");
        res.status(500);
    }
};
