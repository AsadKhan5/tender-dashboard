const express = require("express");

const router = express.Router();
const {
  getAllTenderController,
  createTenderController,
  getSingleTenderById,
  updateTenderController,
  deleteTenderController,
} = require("../controller/TenderCntroller");

// CREATE: Add a new tender
router.post("/tenders", createTenderController);

// READ: Get all tenders
router.get("/tenders", getAllTenderController);

// READ: Get a tender by ID
router.get("/tenders/:id", getSingleTenderById);

// UPDATE: Update a tender by ID
router.put("/tenders/:id", updateTenderController);

// DELETE: Delete a tender by ID
router.delete("/tenders/:id", deleteTenderController);

module.exports = router;
