const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");

const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

//Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
