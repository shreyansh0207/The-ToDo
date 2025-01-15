const mongoose = require("mongoose");

// Connection URI
const mongoURI = "mongodb+srv://shuklashreyansh0207:gFyxp0L0uz3tgoQ8@cluster0.vlkn4.mongodb.net/todos";

// Async function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
}

// Call the connection function
connectToDatabase();

// Define the Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Removes unnecessary whitespace
  },
  description: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false, // Default value for "complete"
  },
});

// Try-Catch for Schema and Model Creation
let todo;
try {
  todo = mongoose.model("todo", todoSchema);
} catch (error) {
  console.error("Error creating the Todo model:", error.message);
  process.exit(1); // Exit the process with a failure code
}

// Export the Model
module.exports = {
  todo,
};
