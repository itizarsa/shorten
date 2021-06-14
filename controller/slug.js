const path = require("path")

const { customAlphabet } = require("nanoid")

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"

const nanoid = customAlphabet(alphabet, 6)

const notFoundPath = path.join(__dirname, "../public/404.html")

const Slug = require("../models/slug")

const findAll = async (req, res, next) => {
	try {
		const getData = await Slug.find({}, [], { sort: { _id: -1 } })

		res.json({
			message: "success",
			data: getData
		})
	} catch (error) {
		next(error)
	}
}

const create = async (req, res, next) => {
	try {
		let { slug, url } = req.body

		if (!slug) {
			slug = nanoid()
		} else {
			const checkSlug = await Slug.findOne({ slug })

			if (checkSlug) throw new Error("Slug in use. 🍔")
		}

		const urlData = new Slug({
			slug: slug,
			url: url
		})

		await urlData.save()

		res.status(200).json({
			message: "success",
			slug: slug
		})
	} catch (error) {
		next(error)
	}
}

const find = async (req, res, next) => {
	try {
		const findUrl = await Slug.findOne({ slug: req.params.id })

		if (findUrl) return res.redirect(301, findUrl.url)

		return res.status(404).sendFile(notFoundPath)
	} catch (error) {
		return res.status(404).sendFile(notFoundPath)
	}
}

module.exports = {
	create,
	find,
	findAll
}
