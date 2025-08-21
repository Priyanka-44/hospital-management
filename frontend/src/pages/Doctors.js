import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMd, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get("http://localhost:5001/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  };

  const addDoctor = () => {
    const name = prompt("Enter doctor name");
    const specialty = prompt("Enter specialty");
    const contact = prompt("Enter contact");

    if (name && specialty) {
      axios
        .post("http://localhost:5001/api/doctors", {
          name,
          specialty,
          contact,
        })
        .then(() => fetchDoctors())
        .catch((err) => alert("Failed to add doctor: " + err.message));
    } else {
      alert("Name and Specialty are required!");
    }
  };

  const editDoctor = (d) => {
    const name = prompt("Update name", d.name);
    const specialty = prompt("Update specialty", d.specialty);
    const contact = prompt("Update contact", d.contact);
if (!name.trim() || !specialty.trim()) {
  alert("Name and Specialty cannot be empty!");
  return;
}

    if (name && specialty) {
      axios
        .put(`http://localhost:5001/api/doctors/${d._id}`, {
          name,
          specialty,
          contact,
        })
        .then(() => fetchDoctors())
        .catch((err) => alert("Failed to update: " + err.message));
    }
  };

  const deleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios
        .delete(`http://localhost:5001/api/doctors/${id}`)
        .then(() => fetchDoctors())
        .catch((err) => alert("Failed to delete: " + err.message));
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
            <FaUserMd className="text-primary me-2" />
            Doctors List
          </h4>
          <button className="btn btn-success" onClick={addDoctor}>
            <FaUserPlus className="me-1" /> Add Doctor
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Doctor Name</th>
                <th>Specialty</th>
                <th>Contact</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d, index) => (
                <tr key={d._id}>
                  <td>{index + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.specialty}</td>
                  <td>{d.contact}</td>
                  <td>{new Date(d.createdAt).toLocaleString()}</td>
                  <td>{new Date(d.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => editDoctor(d)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteDoctor(d._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No doctors found.
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
