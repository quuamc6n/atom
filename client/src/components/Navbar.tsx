import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <div className="nav-container">
      <div className="home-logo">
        <Link to={"/"}>Dashboard</Link>
      </div>
      <ul className="nav">
        <Link to={"/estimates"}>
          <li>Estimates</li>
        </Link>
        <Link to={"/invoices"}>
          <li>Invoices</li>
        </Link>
        <Link to={"/jobs"}>
          <li>Jobs</li>
        </Link>
        <Link to={"/customers"}>
          <li>Customers</li>
        </Link>
        <Link to={"/employees"}>
          <li>Employees</li>
        </Link>
        <div
          id="create"
          onMouseEnter={() => setShowDropDown(true)}
          onMouseLeave={() => setShowDropDown(false)}
          className="dropdown-container"
        >
          Create New +
          {showDropDown && (
            <div className="dropdown-menu">
              <Link to={"/create-customer"}>Customer</Link>
              <Link to={"/create-job"}>Job</Link>
              <Link to={"/create-estimate"}>Estimate</Link>
              <Link to={"/create-invoice"}>Invoice</Link>
              <Link to={"/create-employee"}>Employee</Link>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
