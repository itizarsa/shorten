const mongoose = require("mongoose")

mongoose.pluralize(null)

const Slug = new mongoose.Schema({
	slug: { type: String, required: true },
	url: { type: String, required: true }
})

module.exports = mongoose.model("Slug", Slug)
