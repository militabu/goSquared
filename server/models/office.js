const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema({
    onlineVisitors: {
        type: String,
        required: true
    },
    officeTemperature: {
        type: Number,
        required: true
    },
    plantWatering: {
        type: String,
        required: true
    },
    outsideTemperature: {
        type: Number,
        required: true
    },
    drinksInFridge: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Office', officeSchema)

