
const mongoose = require("mongoose")
mongoose.connect(process.env.URL)
    .then((res) => {
        console.log("Successfull database connection");
    })
    .catch((err) => {
        console.log(err);
    })
