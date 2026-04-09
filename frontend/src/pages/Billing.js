import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFileInvoiceDollar,
  FaPlusSquare,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function Billing() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = () => {
    axios
      .get("http://localhost:5001/api/bills")
      .then((res) => setBills(res.data))
      .catch((err) => console.error(err));
  };

  const addBill = () => {
    const patientName = prompt("Enter patient name");
    const amount = prompt("Enter amount");
    const status = prompt(
      "Enter status (Paid/Unpaid/Partial)",
      "Unpaid"
    );
    const paymentMethod = prompt(
      "Enter payment method (Cash/Card/Insurance)",
      "Cash"
    );
    const notes = prompt("Any notes?");

    if (!patientName || !amount) {
      alert("Patient name and amount are required!");
      return;
    }

    axios
      .post("http://localhost:5001/api/bills", {
        patientName,
        amount: Number(amount),
        status,
        paymentMethod,
        notes,
      })
      .then(() => fetchBills())
      .catch((err) => alert("Failed to add bill: " + err.message));
  };

  const editBill = (b) => {
    const patientName = prompt("Update patient name", b.patientName);
    const amount = prompt("Update amount", b.amount);
    const status = prompt("Update status", b.status);
    const paymentMethod = prompt("Update payment method", b.paymentMethod);
    const notes = prompt("Update notes", b.notes);

    if (!patientName || !amount) {
      alert("Patient name and amount are required!");
      return;
    }

    axios
      .put(`http://localhost:5001/api/bills/${b._id}`, {
        patientName,
        amount: Number(amount),
        status,
        paymentMethod,
        notes,
      })
      .then(() => fetchBills())
      .catch((err) => alert("Failed to update: " + err.message));
  };

  const deleteBill = (id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      axios
        .delete(`http://localhost:5001/api/bills/${id}`)
        .then(() => fetchBills());
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
            <FaFileInvoiceDollar className="text-primary me-2" />
            Billing & Payments
          </h4>
          <button className="btn btn-success" onClick={addBill}>
            <FaPlusSquare className="me-1" /> Add Bill
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover shadow-sm">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Notes</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>{b.patientName}</td>
                  <td>{b.amount}</td>
                  <td>{b.status}</td>
                  <td>{b.paymentMethod}</td>
                  <td>{b.notes}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(b.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => editBill(b)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteBill(b._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {bills.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No bills found.
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
