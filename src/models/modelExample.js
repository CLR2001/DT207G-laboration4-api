import mongoose, { mongo } from "mongoose";

const exampleSchema = new mongoose.Schema({
  
}, {
  timestamps: true
});

const Example = mongoose.model('Example', exampleSchema);

export default Example;