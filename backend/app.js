// Importing necessary packages and middlewares
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const authRoutes = require("./routes/authRoute");
const bidsRoute = require("./routes/bidsRoute");
const tenderRoutes = require("./routes/tenderRoute");

// Create an Express application
const app = express();
const port = 8000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request otherwise
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Enable CORS with the options
app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("./public"));

// Define a test route to verify deployment success
app.get("/", (req, res) => res.status(200).json("Deployment is successful!"));

// Use the user routes for the specified paths
app.use("/auth", authRoutes);
app.use("/tender", tenderRoutes);
app.use("/bids", bidsRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
