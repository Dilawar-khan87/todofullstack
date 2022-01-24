// mongodb+srv://<username>:<password>@mycluster.1xonf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:admin@mycluster.1xonf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);


const User = mongoose.model("User", {
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    role: String,
    password: String,
  });
  