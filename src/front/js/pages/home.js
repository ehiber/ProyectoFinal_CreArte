import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "../../styles/home.css";

export const Home = () => {
  const navigate = useNavigate(); // Hook de navegación

  const [carrito, setCarrito] = useState(() => {
    // Obtener el carrito desde localStorage al iniciar la página
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart || []; // Si no hay carrito guardado, inicializa como vacío
  });

  const clases = [
    {
      id: 1,
      nombre: 'Curso de Cerámica Básica',
      descripcion: 'Aprende las técnicas esenciales de la cerámica y crea tus primeras piezas. Perfecto para empezar tu camino artístico.',
      imagen: 'https://static.wixstatic.com/media/11062b_147dc3a6f24349ff9a4d332be4360d81~mv2.jpg/v1/fill/w_750,h_768,al_c,q_85,usm_1.20_1.00_0.01,enc_auto/11062b_147dc3a6f24349ff9a4d332be4360d81~mv2.jpg',
      precio: '40 €'
    },
    {
      id: 2,
      nombre: 'Iniciación a la Alfarería',
      descripcion: 'Domina el arte de la alfarería. Aprende a modelar arcilla y crea objetos funcionales como tazas y cuencos.​',
      imagen: 'https://static.wixstatic.com/media/aca133_8ede09a940234b0b8cadf8832ed68d57~mv2.jpg/v1/crop/x_0,y_78,w_512,h_379/fill/w_614,h_455,al_c,lg_1,q_80,usm_1.20_1.00_0.01,enc_auto/Manos2_edited.jpg',
      precio: '50 €'
    },
    {
      id: 3,
      nombre: 'Iniciación al Modelado',
      descripcion: 'Descubre cómo modelar piezas únicas de arcilla, desde vajillas hasta pequeñas esculturas, con técnicas básicas.',
      imagen: 'https://static.wixstatic.com/media/aca133_7feacf9a19724ad0ba3ae0b923527db0~mv2.png/v1/fill/w_694,h_514,al_c,q_85,usm_1.20_1.00_0.01,enc_auto/BONO-INICIACION-AL-MODELADO-cua.png',
      precio: '45 €'
    },
  ];

  const handleInscripcion = (id) => {
    const claseSeleccionada = clases.find(clase => clase.id === id);
    const claseYaEnCarrito = carrito.find(item => item.id === id);

    if (!claseYaEnCarrito) {
      const nuevoCarrito = [...carrito, claseSeleccionada];
      setCarrito(nuevoCarrito);
      localStorage.setItem('cart', JSON.stringify(nuevoCarrito)); // Guardamos el carrito en localStorage
      navigate("/carrito"); // Redirigimos al carrito
    } else {
      alert('Esta clase ya está en tu carrito.');
    }
  };

  return (
    <div className="home-container">
      <div className="text-center mt-5">
        <h1 className="display-4">¡Despierta tu creatividad con CreArte!</h1>
        <p className="lead">Descubre tu potencial artístico en nuestras clases de cerámica y alfarería.</p>
      </div>

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://amasarte.es/wp-content/uploads/elementor/thumbs/clases-de-ceramica-art-y-alf-mensuales2-qsb01jqazm9vrfn13ajffg4n5jto7m0vzijhr6tiby.png"
              className="d-block w-100 img-fluid"
              alt="Imagen carrusel 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://amasarte.es/wp-content/uploads/2023/11/eventos-con-amasarte.jpg"
              className="d-block w-100 img-fluid"
              alt="Imagen carrusel 2"
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      <div className="container mt-5" id="clases">
        <h2 className="text-center nuestros-cursos-title">Nuestros Cursos</h2>
        <div className="row">
          {clases.map((clase) => (
            <div className="col-md-4 col-sm-6 col-12 mb-4" key={clase.id}>
              <div className="card">
                <img
                  src={clase.imagen}
                  className="card-img-top img-fluid"
                  alt={clase.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{clase.nombre}</h5>
                  <p className="card-text">{clase.descripcion}</p>
                  <p className="text-primary">Precio: {clase.precio}</p>
                  <button className="btn btn-success" onClick={() => handleInscripcion(clase.id)}>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

