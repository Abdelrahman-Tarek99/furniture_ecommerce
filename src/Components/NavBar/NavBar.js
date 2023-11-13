import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../NavBar/NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src="img/Meubel House_Logos-05.png" alt="Furniro-logo" />
          <a className="navbar-brand" href="#">
            Furniro
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item" id="nav-bar-links">
                <Link to="/" className="nav-link"> Home</Link>
              </li>
              <li className="nav-item" id="nav-bar-links">
                <Link to="/" className="nav-link"> Shop</Link>
              </li>
              <li className="nav-item" id="nav-bar-links">
                <Link to="/" className="nav-link"> About</Link>
              </li>
              <li className="nav-item" id="nav-bar-links">
                <Link to="/" className="nav-link"> Contact</Link>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav justify-content-end leftnavbar">
              <li className="nav-item my-3 p-3">
                <img src="img/person.png" alt="person" />
              </li>
              <li className="nav-item p-3 my-3">
                <img src="img/search.png" alt="search" />
              </li>
              <li className="nav-item my-3 p-3">
                <img src="img/heart.png" alt="heart" />
              </li>
              <li className="nav-item my-3 p-3">
                <img src="img/shoppingcart.png" alt="shopping-cart" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
