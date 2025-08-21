import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCalendarPlus,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://localhost:5001/api/appointments")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  };

  const addAppointment = () => {
  const patientName = prompt("Enter patient name");
  const doctorName = prompt("Enter doctor name");
  const doctorSpecialty = prompt("Enter doctor specialty");
  const date = prompt("Enter date (YYYY-MM-DD)");
  const status = prompt("Enter status (Pending/Confirmed/Cancelled)", "Pending");
  const notes = prompt("Any notes?");

  if (!patientName || !doctorName || !doctorSpecialty || !date) {
    alert("Patient, Doctor, Specialty and Date are required!");
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    alert("Invalid date format. Use YYYY-MM-DD");
    return;
  }

  axios
    .post("http://localhost:5001/api/appointments", {
      patientName,
      doctorName,
      doctorSpecialty,
      date: new Date(date),
      status,
      notes,
    })
    .then(() => fetchAppointments())
    .catch((err) => alert("Failed to add appointment: " + err.message));
};


  const editAppointment = (a) => {
    const patientName = prompt("Update patient name", a.patientName);
    const doctorName = prompt("Update doctor name", a.doctorName);
    const doctorSpecialty = prompt("Update doctor specialty", a.doctorSpecialty);
    const date = prompt("Update date (YYYY-MM-DD)", a.date.substring(0, 10));
    const status = prompt(
      "Update status (Pending/Confirmed/Cancelled)",
      a.status
    );
    const notes = prompt("Update notes", a.notes);

    if (patientName && doctorName && doctorSpecialty && date) {
      axios
        .put(`http://localhost:5001/api/appointments/${a._id}`, {
          patientName,
          doctorName,
          doctorSpecialty,
          date,
          status,
          notes,
        })
        .then(() => fetchAppointments())
        .catch((err) => alert("Failed to update: " + err.message));
    }
  };

  const deleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      axios
        .delete(`http://localhost:5001/api/appointments/${id}`)
        .then(() => fetchAppointments());
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <h4 className="text-center mb-4">HMS</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="/dashboard" className="nav-link text-white active">
              <i className="fas fa-chart-line me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="/patients" className="nav-link text-white">
              <i className="fas fa-hospital-user me-2"></i> Patients
            </a>
          </li>
          <li className="nav-item">
            <a href="/doctors" className="nav-link text-white">
              <i className="fas fa-user-md me-2"></i> Doctors
            </a>
          </li>
          <li className="nav-item">
            <a href="/appointments" className="nav-link text-white">
              <i className="fas fa-calendar-check me-2"></i> Appointments
            </a>
          </li>
          <li className="nav-item">
            <a href="/rooms" className="nav-link text-white">
              <i className="fas fa-bed me-2"></i> Room Allocation
            </a>
          </li>
          <li className="nav-item">
            <a href="/billing" className="nav-link text-white">
              <i className="fas fa-file-invoice-dollar me-2"></i> Billing
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>
            <FaCalendarCheck className="text-primary me-2" />
            Appointments List
          </h4>
          <button className="btn btn-success" onClick={addAppointment}>
            <FaCalendarPlus className="me-1" /> Add Appointment
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a, index) => (
                <tr key={a._id}>
                  <td>{index + 1}</td>
                  <td>{a.patientName}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.doctorSpecialty}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.status}</td>
                  <td>{a.notes}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => editAppointment(a)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteAppointment(a._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
