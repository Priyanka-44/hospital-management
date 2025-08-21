import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">Hospital</Link>
        <div>
          <Link className="nav-link" to="/patients">Patients</Link>
          <Link className="nav-link" to="/doctors">Doctors</Link>
        </div>
      </div>
    </nav>
  );
}
