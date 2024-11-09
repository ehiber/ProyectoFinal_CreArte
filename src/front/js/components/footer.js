import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div 
      className="page-container" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',  // Se asegura de que el contenedor ocupe el 100% de la altura disponible sin forzar 100vh
        margin: 0,  // Asegura que no haya márgenes extras
      }}
    >
      {/* Contenido de la página (Formulario o cualquier otro contenido) */}
      <div style={{ flex: 1, marginBottom: '2rem' }}> {/* Aumento del margen entre contenido y footer */}
        {/* Aquí iría tu formulario o cualquier contenido principal */}
      </div>

      {/* Footer */}
      <footer 
        className="navbar navbar-expand-lg navbar-light" 
        style={{ 
          backgroundColor: '#d09f7f', 
          padding: '0.5rem',
          marginTop: 'auto',  // Esto asegura que el footer siempre se quede al final
          marginBottom: 'rem',  // Aumento del margen debajo del footer para más separación
        }}
      >
        <div 
          className="container d-flex flex-column align-items-center justify-content-center text-center" 
          style={{ color: "black" }}
        >
          {/* Información de contacto */}
          <div className="mb-2">
            <h5 className="font-weight-bold mb-1" style={{ fontSize: "1rem", color: "black" }}>CreArte</h5>
            <p className="mb-1" style={{ fontSize: "0.8rem", color: "black" }}>Correo: hola@crearte.es</p>
            <p className="mb-1" style={{ fontSize: "0.8rem", color: "black" }}>Teléfono: +34 000 000 000</p>
          </div>

          {/* Redes sociales */}
          <div className="mb-2">
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li><a href="#" className="text-dark mx-1"><i className="fab fa-facebook" /></a></li>
              <li><a href="#" className="text-dark mx-1"><i className="fab fa-instagram" /></a></li>
              <li><a href="#" className="text-dark mx-1"><i className="fab fa-twitter" /></a></li>
            </ul>
          </div>

          {/* Derechos reservados y política de cookies */}
          <div 
            className="text-center p-1" 
            style={{
              backgroundColor: '#d09f7f',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: 0, // Eliminar el margen debajo del footer
            }}
          >
            <p className="mb-0" style={{ fontSize: "0.8rem", color: "black" }}>© 2024 CreArte. Todos los derechos reservados.</p>
            <p>
              <Link 
                to="/politica-de-cookies" 
                className="text-dark" 
                style={{ fontSize: "0.8rem" }}
              >
                Política de cookies
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
