import ErrorHandeler, { notMatch } from "../middlewares/error.js";
import { User } from "../models/model.js";
import { Task } from "../models/task.js";
import { Taskmessage } from "../utils/info.js";
export const NewTask = async (req, res, next) => {
     const { title, description } = req.body;
     try {
          await Task.create({
               title,
               description,
               user: req.user._id
          })
          Taskmessage(res, 'Task is created', 201, true)
     } catch (error) {
          next(error)
     }
}
export const getMyTasks = async (req, res) => {
     const id = req.user._id;
     console.log(id)
     const user = await Task.find({ user: id })
     res.json({
          tasks: user
     })
}
export const Deltetask = async (req, res, next) => {
     const { id } = req.params;
     try {
          const task = await Task.deleteOne({ _id: id })
          if (task.deletedCount === 0) {
               return next(new ErrorHandeler('Invalid id', 404))
          }
          res.status(200).json({
               message: 'task is deleted',
               success: true,
          })
     } catch (error) {
          next(error)
     }
}
export const Update = async (req, res, next) => {
     const { id } = req.params
     try {
          const task = await Task.findById({ _id: id })
          task.iscomleated = !task.iscomleated;
          await task.save()
          notMatch(res, 200, 'Updataed', true)
     } catch (error) {
          // notMatch(res, 400, 'Not at all ',)
          next();
     }
}


