const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
app.get("/", (req, res) => {
    res.send("✅ Hospital Management Backend is running.");
});
