const db = require("../utils/connecton");

const createTenderController = async (req, res) => {
  try {
    let {
      name,
      description,
      startTime,
      endTime,
      bufferTime,
      status,
      createdBy,
    } = req.body;

    // Default value for `createdBy` if not provided
    if (!createdBy) {
      createdBy = "me"; // Default to "me" if createdBy is not provided
    }
    // Validate required fields
    if (!name || !startTime || !endTime || !createdBy) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // SQL query to insert a new tender
    const query = `
      INSERT INTO tenders (name, description, startTime, endTime, bufferTime, status, createdBy)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Prepare parameters for the query
    const params = [
      name,
      description || null, // Default to null if description is not provided
      startTime,
      endTime,
      bufferTime || null, // Default to null if bufferTime is not provided
      status || "open", // Default status to 'open' if not provided
      createdBy,
    ];

    // Execute the SQL query
    await db.execute(query, params);
    res.status(201).json({
      message: "Tender created successfully",
      tenderId: this.lastID, // Assuming `this.lastID` gives the ID of the inserted record
    });
  } catch (error) {
    // Catch any unexpected errors and return a 500 status with the error message
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ message: "Error creating tender", error: error.message });
  }
};

const getAllTenderController = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tenders");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json(error);
  }
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
