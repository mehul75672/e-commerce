const mongoose = require("mongoose");

const coingecko_historical_coin_data = new mongoose.Schema({
    name: {
        type: String
    },
    current_price: {
        type: String
    },
    market_cap: {
        type: String
    },
    total_volume: {
        type: String
    },
    date: {
        type: String
    },
    apiresponse: [{
        response: {
            type: Array
        }
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model("coingecko_historical_coin_data", coingecko_historical_coin_data);