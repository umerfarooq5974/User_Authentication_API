// import express from "express";
// import dotenv from "dotenv";
// import "./src/db/mongoose.js";
// import userRoutes from "./src/routes/userRoutes.js"

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4545;

// app.use(express.json());

// app.get("/", (req, res)=>{
//     res.send("✅ Auth API is running...")
// })

// app.use("/api/users", userRoutes);

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


import express from "express";
import dotenv from "dotenv";
import "./src/db/mongoose.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("✅ Auth API is running...");
});

// Routes
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
