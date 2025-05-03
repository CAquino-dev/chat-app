const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // Import routes
const protectedRoutes = require("./routes/protectedRoutes");
const messageRoutes = require("./routes/messageRoutes");
const projectRoutes = require('./routes/projectRoutes');


require("./config/db"); // Ensure database connects

const app = express();
app.use(express.json()); // Parse JSON
app.use(cors()); // Handle CORS

app.use("/api/auth", authRoutes); // Use the auth routes
app.use("/api/protected", protectedRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/project", projectRoutes);

app.get("/", (req, res) => {
  res.send("Chat API is running!");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});