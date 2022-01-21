import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    const clearLocal = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        props.setAuth(false);
      };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="/">Library Management</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/students">Students <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/books">Books <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/manage">Manage <span className="sr-only">(current)</span></Link>
      </li>
    </ul>
    <span className="navbar-text">
    <Link className="nav-link" to="/login" onClick={(e) => clearLocal(e)}>Logout <span className="sr-only">(current)</span></Link>
    </span>
    
  </div>
</nav>
  );
}
