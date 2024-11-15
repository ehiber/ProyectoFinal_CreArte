import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import SearchBar from "./SearchBar"; // Importa el nuevo componente

export const Navbar = () => {
  const { store } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#d09f7f', padding: '0.5rem 1rem' }}>
      <div className="container-fluid">
        {/* Logo de la tienda */}
        <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontSize: '1.5rem' }}>
          CreArte
        </Link>

        {/* Enlaces del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/" style={{ fontSize: '0.9rem' }}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories" style={{ fontSize: '0.9rem' }}>Clases mensuales</Link>
            </li>
          </ul>

          {/* Carrito con cantidad de artículos */}
          <Link to="/cart" className="btn btn-outline-dark d-flex align-items-center" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '16px' }}></i>
            <span className="badge bg-secondary ms-1" style={{ fontSize: '0.75rem' }}>
              {store.cartItems.length > 0 ? store.cartItems.length : 0}
            </span>
          </Link>

          {/* Botones de registro e inicio de sesión */}
          <Link to="/login" className="btn btn-outline-primary ms-2" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>Iniciar Sesión</Link>
          <Link to="/register" className="btn btn-outline-secondary ms-2" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>Registrarse</Link>
        </div>
      </div>
    </nav>
  );
};






