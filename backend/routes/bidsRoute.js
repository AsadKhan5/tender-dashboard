const express = require("express");
const {
  createBidController,
  getBidsByTenderController,
  getBidByIdController,
  updateBidController,
  deleteBidController,
  getAllBids,
} = require("../controller/bidsController");

const router = express.Router();

// Routes for Bids
router.post("/submit-bid", createBidController); // Create a new bid
router.get("/get-all", getAllBids); // Create a new bid

router.get("/bids/tender/:tenderId", getBidsByTenderController); // Get all bids for a tender
router.get("/bids/:id", getBidByIdController); // Get a bid by ID
router.put("/bids/:id", updateBidController); // Update a bid by ID
router.delete("/bids/:id", deleteBidController); // Delete a bid by ID

module.exports = router;
