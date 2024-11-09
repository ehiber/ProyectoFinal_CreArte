import React, { useState } from "react";
import "../../styles/categories.css";

const Categories = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    horario: "",
    comentarios: "",
  });
  
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmissionMessage(`¡Inscripción recibida! Has elegido el horario: ${formData.horario}`);
    
    setFormData({
      nombre: "",
      correo: "",
      horario: "",
      comentarios: "",
    });
  };

  return (
    <div className="categories-container">
      <div className="text-center mt-5">
        <h1 className="display-4">Clases mensuales de cerámica</h1>
      </div>

      {/* Sección de introducción a las clases */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            {/* Imagen con el texto sobre ella */}
            <div className="image-container">
              <img
                src="https://amasarte.es/wp-content/uploads/2023/11/alumna-de-amasarte-curso-ceramica-artistica-1536x1024.jpg"
                alt="Clases de cerámica"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
          <div className="col-md-6">
            <p className="lead">
              Todas nuestras clases están enfocadas a iniciación. Aunque el espacio
              se comparte, trabajarás en tus propios proyectos. Diseñaremos las piezas
              que vayas a crear y te guiamos para que puedas hacerlo. De esta manera,
              aprenderás las diferentes técnicas a un ritmo libre y personalizado.
            </p>
          </div>
        </div>
      </div>

      {/* Información sobre los cursos y el sistema de bonos */}
      <div className="container mt-5">
        <h2 className="text-center">¿Quieres hacer una reserva en nuestras clases mensuales?</h2>
        <p className="lead">
          Para comenzar a asistir a nuestras clases de cerámica y alfarería, primero es necesario realizar uno de los cursos de iniciación al modelado o al torno alfarero. Estos cursos te proporcionarán las bases esenciales para poder disfrutar y aprovechar al máximo nuestras sesiones.
        </p>
        <p className="lead">
          Una vez que completes el curso de iniciación, podrás acceder a nuestro sistema de bonos de horas. Esto significa que puedes adquirir bonos de 8, 16, o 24 horas, según tus necesidades. Al reservar tus clases, te descontaremos las horas correspondientes cada vez que asistas.
        </p>
        <p className="lead">
          **Lo mejor de todo**: No cobramos mensualidades y no es necesario que asistas en días o horarios fijos. ¡Tú decides cuándo venir y por cuántas horas!
        </p>

        <h4>Horarios de nuestras clases:</h4>
        <p><strong>Mañanas:</strong> Martes, jueves y sábados de 11:00 a 14:00</p>
        <p><strong>Tardes:</strong> Lunes a viernes de 16:00 a 21:00</p>
      </div>

      {/* Formulario de inscripción */}
      <div className="container mt-5">
        <h2 className="text-center">Formulario de Inscripción</h2>
        <p className="text-center">¡Reserva tu plaza ahora!</p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Nombre y Apellido */}
            <div className="col-md-6 mb-3">
              <label htmlFor="nombre" className="form-label">Nombre y Apellido</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>

            {/* Correo Electrónico */}
            <div className="col-md-6 mb-3">
              <label htmlFor="correo" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Ejemplo@correo.com"
                required
              />
            </div>
          </div>

          {/* Selección de horario */}
          <div className="mb-3">
            <label htmlFor="horario" className="form-label">Horario preferido</label>
            <select
              className="form-control"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un horario</option>
              <option value="Mañanas">Mañanas (11:00 a 14:00)</option>
              <option value="Tardes">Tardes (16:00 a 21:00)</option>
            </select>
          </div>

          {/* Campo de comentarios */}
          <div className="mb-3">
            <label htmlFor="comentarios" className="form-label">Comentarios adicionales</label>
            <textarea
              className="form-control"
              id="comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Escribe cualquier comentario o pregunta adicional"
              rows="4"
            ></textarea>
          </div>

          {/* Botón de inscripción */}
          <button type="submit" className="btn btn-primary w-100">Inscribirse</button>
        </form>

        {/* Mensaje de confirmación */}
        {submissionMessage && (
          <div className="mt-4 alert alert-success text-center">
            <strong>{submissionMessage}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
