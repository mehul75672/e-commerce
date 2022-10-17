var mongoose = require("mongoose")
const messageschema = mongoose.Schema({
    groupname: {
        type: String
    },
    admin: {
        type: Array,
        ref:"users"
    },
    users_id:
    {
        type: Array,
        ref:"users"
    },
    messages:[
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


