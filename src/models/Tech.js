const mongoose = require('mongoose')

const TechSchema = new mongoose.Schema({
    techName: String,
    techCategory: String,
})

module.exports = mongoose.model('Tech', TechSchema)