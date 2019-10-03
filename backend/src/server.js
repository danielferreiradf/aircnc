const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = 5000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Allow Cors X-origin
app.use(cors());
// Allow express to handle json
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
