import mongoose from "mongoose"

const Mschema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
     },
     iscomleated: {
          type: Boolean,
          default: false,
     }
     , ceratedAT: {
          type: Date,
          default: Date.now,
     }
})

export const Task = mongoose.model('Task', Mschema)