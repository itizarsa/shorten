const express = require("express")
const dotenv = require("dotenv")
const chalk = require("chalk")
const cors = require("cors")
const path = require("path")

dotenv.config({ path: "./config/config.env" })

const db = require("./config/db")
const routes = require("./routes")

db.connectDb()

const app = express()

const PORT = process.env.PORT
const env = process.env.NODE_ENV
const green = chalk.green.bold
const cyan = chalk.cyan.bold
const red = chalk.red.bold

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(routes)

app.use((error, req, res, next) => {
	if (error.response) {
		res.status(error.response.status || 500).json({
			message: error.response.data === " " ? "Something Went Wrong" : error.response.data,
			stack: env === "production" ? "🍔" : error.stack
		})
	} else {
		res.status(error.status || 500).json({
			message: error.message,
			stack: env === "production" ? "🍔" : error.stack
		})
	}
})

process.on("unhandledRejection", (reason, p) => {
	throw reason
})

process.on("uncaughtException", (error) => {
	console.log(red("Uncaught Exception ✗", error))

	process.exit(1)
})

app.listen(PORT, () =>
	console.log(`${green("✓")} ${cyan(` App is running at port ${PORT} in ${env} mode.`)}`)
)
