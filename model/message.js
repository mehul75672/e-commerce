var mongoose = require("mongoose")
const messageschema = mongoose.Schema({
    gruapname: {
        type: String
    },
    admin: {
        type: Array
    },
    users_id:
    {
        type: Array
    },
    messages: [
        {
            name: String,
            text: String,
            time:String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("messages", messageschema)


