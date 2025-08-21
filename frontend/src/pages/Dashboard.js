import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/notifications")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, []);

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
        <h4 className="mb-4">WELCOME TO DASHBOARD</h4>
<div className="row g-4">
  {/* Top row */}
 <div className="row g-4">
  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-users fa-2x text-primary mb-2"></i>
      <h6>Manage Users</h6>
      <p>Total Users: 6</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-user-md fa-2x text-success mb-2"></i>
      <h6>Manage Doctors</h6>
      <p>Total Doctors: 3</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-calendar-check fa-2x text-warning mb-2"></i>
      <h6>Appointments</h6>
      <p>Total Appointments: 6</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-hospital-user fa-2x text-info mb-2"></i>
      <h6>Manage Patients</h6>
      <p>Total Patients: 5</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-question-circle fa-2x text-secondary mb-2"></i>
      <h6>New Queries</h6>
      <p>Total New Queries: 1</p>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4">
      <i className="fas fa-bed fa-2x text-danger mb-2"></i>
      <h6>Rooms Allocated</h6>
      <p>Total Rooms: 4</p>
    </div>
  </div>
</div>

</div>


        {/* Notifications */}
        <div className="card shadow-sm mt-4">
          <div className="card-header bg-primary text-white">
            Latest Notifications
          </div>
          <ul className="list-group list-group-flush">
            {notifications.length === 0 && (
              <li className="list-group-item">No notifications yet.</li>
            )}
            {notifications.map((n) => (
              <li key={n._id} className="list-group-item">
                <strong>{n.type}</strong>: {n.message} <br />
                <small className="text-muted">
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
