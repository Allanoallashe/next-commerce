const { Schema, model, models } = require("mongoose");
import mongoose from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  main: { type: mongoose.Types.ObjectId, ref: 'Category' },
  properties:[{type:Object}]
})

 export const Category = models?.Category || model('Category', CategorySchema)