const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tasks: [{}],
    categories: [{}]
});

const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = { Tasks }