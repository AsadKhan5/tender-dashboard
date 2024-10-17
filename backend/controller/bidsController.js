const db = require("../utils/connecton"); // Database connection

// CREATE: Add a new bid
const createBidController = async (req, res) => {
  const { tenderId, userId, companyName, bidCost, isLastFiveMinutesFlag } =
    req.body;

  if (!tenderId || !userId || !companyName || !bidCost) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO bids (tenderId, userId, companyName, bidCost, isLastFiveMinutesFlag)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      tenderId,
      userId,
      companyName,
      bidCost,
      isLastFiveMinutesFlag || 0,
    ];

    const { lastID } = await new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) reject(err);
        resolve({ lastID: this.lastID });
      });
    });

    res
      .status(201)
      .json({ message: "Bid created successfully", bidId: lastID });
  } catch (err) {
    res.status(500).json({ message: "Error creating bid", error: err });
  }
};

// READ: Get all bids for a specific tender
const getBidsByTenderController = async (req, res) => {
  const { tenderId } = req.params;

  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM bids WHERE tenderId = ?",
        [tenderId],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        }
      );
    });

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving bids", error: err });
  }
};

// READ: Get a specific bid by ID
const getBidByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM bids WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });

    if (!bid) return res.status(404).json({ message: "Bid not found" });

    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving bid", error: err });
  }
};

// UPDATE: Update a bid by ID
const updateBidController = async (req, res) => {
  const { id } = req.params;
  const { companyName, bidCost, isLastFiveMinutesFlag } = req.body;

  const query = `
    UPDATE bids
    SET companyName = ?, bidCost = ?, isLastFiveMinutesFlag = ?, bidTime = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const params = [companyName, bidCost, isLastFiveMinutesFlag || 0, id];

  try {
    const result = await new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });

    if (result.changes === 0)
      return res.status(404).json({ message: "Bid not found" });

    res.json({ message: "Bid updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating bid", error: err });
  }
};

// DELETE: Delete a bid by ID
const deleteBidController = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await new Promise((resolve, reject) => {
      db.run("DELETE FROM bids WHERE id = ?", [id], function (err) {
        if (err) reject(err);
        resolve({ changes: this.changes });
      });
    });

    if (result.changes === 0)
      return res.status(404).json({ message: "Bid not found" });

    res.json({ message: "Bid deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting bid", error: err });
  }
};

module.exports = {
  createBidController,
  getBidsByTenderController,
  getBidByIdController,
  updateBidController,
  deleteBidController,
};
