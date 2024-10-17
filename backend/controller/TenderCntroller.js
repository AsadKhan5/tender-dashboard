const db = require("../utils/connecton");

const createTenderController = (req, res) => {
  const {
    name,
    description,
    startTime,
    endTime,
    bufferTime,
    status,
    createdBy,
  } = req.body;

  if (!name || !startTime || !endTime || !createdBy) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = `
        INSERT INTO tenders (name, description, startTime, endTime, bufferTime, status, createdBy)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  const params = [
    name,
    description,
    startTime,
    endTime,
    bufferTime,
    status || "open",
    createdBy,
  ];

  db.run(query, params, function (err) {
    if (err)
      return res
        .status(500)
        .json({ message: "Error creating tender", error: err });
    res
      .status(201)
      .json({ message: "Tender created successfully", tenderId: this.lastID });
  });
};

const getAllTenderController = (req, res) => {
  db.all("SELECT * FROM tenders", [], (err, rows) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving tenders", error: err });
    res.json(rows);
  });
};

const getSingleTenderById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM tenders WHERE id = ?", [id], (err, row) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error retrieving tender", error: err });
    if (!row) return res.status(404).json({ message: "Tender not found" });
    res.json(row);
  });
};

const updateTenderController = (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    startTime,
    endTime,
    bufferTime,
    status,
    createdBy,
  } = req.body;

  const query = `
        UPDATE tenders
        SET 
          name = ?, 
          description = ?, 
          startTime = ?, 
          endTime = ?, 
          bufferTime = ?, 
          status = ?, 
          createdBy = ?, 
          updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
  const params = [
    name,
    description,
    startTime,
    endTime,
    bufferTime,
    status,
    createdBy,
    id,
  ];

  db.run(query, params, function (err) {
    if (err)
      return res
        .status(500)
        .json({ message: "Error updating tender", error: err });
    if (this.changes === 0)
      return res.status(404).json({ message: "Tender not found" });
    res.json({ message: "Tender updated successfully" });
  });
};

const deleteTenderController = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tenders WHERE id = ?", [id], function (err) {
    if (err)
      return res
        .status(500)
        .json({ message: "Error deleting tender", error: err });
    if (this.changes === 0)
      return res.status(404).json({ message: "Tender not found" });
    res.json({ message: "Tender deleted successfully" });
  });
};

module.exports = {
  createTenderController,
  getAllTenderController,
  getSingleTenderById,
  updateTenderController,
  deleteTenderController,
};
