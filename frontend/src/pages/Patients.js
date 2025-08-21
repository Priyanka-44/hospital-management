import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPlus, FaEdit, FaTrash, FaUserInjured } from "react-icons/fa";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addPatient = () => {
    const name = prompt("Enter patient name");
    const age = prompt("Enter age");
    const contact = prompt("Enter contact");
    const gender = prompt("Enter gender");
    const diagnosis = prompt("Enter diagnosis");

    if (name && age && gender && diagnosis) {
      axios
        .post("http://localhost:5001/api/patients", {
          name,
          age,
          contact,
          gender,
          diagnosis,
        })
        .then(() => window.location.reload())
        .catch((err) => alert("Failed to add patient: " + err.message));
    }
  };

  const editPatient = (p) => {
    const name = prompt("Update name", p.name);
    const age = prompt("Update age", p.age);
    const contact = prompt("Update contact", p.contact);
    const gender = prompt("Update gender", p.gender);
    const diagnosis = prompt("Update diagnosis", p.diagnosis);

    if (name && age && gender && diagnosis) {
      axios
        .put(`http://localhost:5001/api/patients/${p._id}`, {
          name,
          age: Number(age),
          contact,
          gender,
          diagnosis,
        })
        .then(() => window.location.reload())
        .catch((err) => alert("Failed to update: " + err.message));
    }
  };

  const deletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      axios
        .delete(`http://localhost:5001/api/patients/${id}`)
        .then(() => window.location.reload());
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
            <FaUserInjured className="text-primary me-2" />
            Patients List
          </h4>
          <button className="btn btn-success" onClick={addPatient}>
            <FaUserPlus className="me-1" /> Add Patient
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Diagnosis</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.contact}</td>
                  <td>{p.diagnosis}</td>
                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                  <td>{new Date(p.updatedAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => editPatient(p)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deletePatient(p._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No patients found.
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
