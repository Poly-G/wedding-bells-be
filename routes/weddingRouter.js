require("dotenv").config();

const Wedding = require("../models/weddings");
const guestsRouter = require("./guestsRouter");

const express = require("express");

const router = express.Router();
router.use("/:weddingId/guests", guestsRouter);

// GET VENDOR table
router.get("/", async (req, res) => {
	try {
		const weddings = await Wedding.find();
		res.json(weddings);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//POST to VENDOR table
router.post("/", async (req, res) => {
	const wedding = req.body;
	try {
		if (wedding) {
			const newWedding = await Wedding.add(wedding);
			if (newWedding) {
				res.status(201).json(newWedding);
			} else {
				res.status(404).json({ message: "wedding could not be added" });
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET VENDOR table with ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const wedding = await Wedding.findById(id);

		if (wedding) {
			res.json(wedding);
		} else {
			res.status(404).json({ message: "could not find wedding" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to get wedding" });
	}
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await Wedding.remove(id);

		if (deleted) {
			res.json({ removed: deleted });
		} else {
			res.status(404).json({ message: "could not find wedding with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "failed to delete wedding" });
	}
});

// EDIT VENDOR with ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	try {
		const wedding = await Wedding.findById(id);

		if (wedding) {
			const updatedWedding = await Wedding.update(changes, id);
			res.json(updatedWedding);
		} else {
			res.status(404).json({ message: "could not find wedding with given id" });
		}
	} catch (err) {
		res.status(500).json({ message: "Failed to update wedding" });
	}
});

module.exports = router;