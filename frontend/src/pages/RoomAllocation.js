import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBed,
  FaPlusSquare,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function RoomAllocation() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios
      .get("http://localhost:5001/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  };

  const addRoom = () => {
    const patientName = prompt("Enter patient name");
    const roomNumber = prompt("Enter room number");
    const wardType = prompt("Enter ward type (General/Private/ICU)");
    const bedNumber = prompt("Enter bed number");
    const status = prompt(
      "Enter status (Occupied/Available)",
      "Occupied"
    );

    if (!patientName || !roomNumber || !wardType || !bedNumber) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("http://localhost:5001/api/rooms", {
        patientName,
        roomNumber,
        wardType,
        bedNumber,
        status,
      })
      .then(() => fetchRooms())
      .catch((err) => alert("Failed to allocate room: " + err.message));
  };

  const editRoom = (r) => {
    const patientName = prompt("Update patient name", r.patientName);
    const roomNumber = prompt("Update room number", r.roomNumber);
    const wardType = prompt("Update ward type", r.wardType);
    const bedNumber = prompt("Update bed number", r.bedNumber);
    const status = prompt("Update status", r.status);

    if (!patientName || !roomNumber || !wardType || !bedNumber) {
      alert("All fields are required!");
      return;
    }

    axios
      .put(`http://localhost:5001/api/rooms/${r._id}`, {
        patientName,
        roomNumber,
        wardType,
        bedNumber,
        status,
      })
      .then(() => fetchRooms())
      .catch((err) => alert("Failed to update: " + err.message));
  };

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure you want to de-allocate this room?")) {
      axios
        .delete(`http://localhost:5001/api/rooms/${id}`)
        .then(() => fetchRooms());
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
            <FaBed className="text-primary me-2" />
            Room Allocation
          </h4>
          <button className="btn btn-success" onClick={addRoom}>
            <FaPlusSquare className="me-1" /> Allocate Room
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Room #</th>
                <th>Ward Type</th>
                <th>Bed #</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r, index) => (
                <tr key={r._id}>
                  <td>{index + 1}</td>
                  <td>{r.patientName}</td>
                  <td>{r.roomNumber}</td>
                  <td>{r.wardType}</td>
                  <td>{r.bedNumber}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(r.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => editRoom(r)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteRoom(r._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No room allocations found.
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
