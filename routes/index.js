const express = require("express")
const router = express.Router()
const path = require("path")

const slug = require("../controller/slug")

router.get("/", (req, res) => {
	return res.sendFile("home.html", { root: path.join(__dirname, "../public") })
})

router.post("/slug", slug.create)

router.get("/all", slug.findAll)

router.get("/:id", slug.find)

module.exports = router
