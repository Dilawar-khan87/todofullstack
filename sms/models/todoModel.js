const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true });

const Todo = mongoose.model("Todo", {
  id: Number,
  text: String,
  completed: Boolean,
});

module.exports = Todo;
