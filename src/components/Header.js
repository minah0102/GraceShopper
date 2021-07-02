import React from "react";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-light navbar-expand-md">
        <div className="container-lg">
          <h1>
            <a href="#" className="text-decoration-none text-primary">
              Catnip Corp.
            </a>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Sign up
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Log in
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
