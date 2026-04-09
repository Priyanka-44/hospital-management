const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");
require("dotenv").config();


const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");
const doctorRoutes = require("./routes/doctor");
const appointmentsRoutes = require("./routes/appointments");
const roomsRoutes = require("./routes/rooms");
const billsRoutes = require("./routes/bills");
const notificationsRoutes = require("./routes/notifications");


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentsRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/notifications", notificationsRoutes);


app.get("/", (req, res) => {
  res.send("Hospital Management Backend is running.");
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
  }
}

connectDB();

// Vercel export
module.exports = app;
module.exports.handler = serverless(app);