const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

require("dotenv").config();

const routes = require("./routes");

const app = express();
const PORT = 5000;

// Splits http server to allow sockets
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;

  console.log(connectedUsers);
});

// Middleware to pass sockets information to the routes
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
// Allow Cors X-origin
app.use(cors());
// Allow express to handle json
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
