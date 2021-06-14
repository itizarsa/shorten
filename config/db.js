const mongoose = require("mongoose")
const chalk = require("chalk")

const red = chalk.red.bold
const green = chalk.green.bold
const magenta = chalk.magenta.bold

const connectDb = () => {
	const URI = process.env.MONGO
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}

	mongoose.connect(URI, options)

	const db = mongoose.connection

	db.on("error", (err) => {
		console.error(err)
		console.log(`${red("✗")} MongoDB connection error. Please make sure MongoDB is running.`)

		process.exit(1)
	})

	db.once("open", () => {
		console.log(`${green("✓")}  ${magenta(`MongoDB Connection Established.`)}`)
	})
}

module.exports = {
	connectDb
}
