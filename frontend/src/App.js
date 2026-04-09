import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import PatientRegistration from "./pages/PatientRegistration";
import DoctorRegistration from "./pages/DoctorRegistration";
import RoomAllocation from "./pages/RoomAllocation";
import Billing from "./pages/Billing";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/rooms" element={<RoomAllocation />} />
        <Route path="/billing" element={<Billing />} />



        <Route path="/register-patient" element={<PatientRegistration />} />
        <Route path="/register-doctor" element={<DoctorRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
