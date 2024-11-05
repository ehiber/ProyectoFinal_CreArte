import React, { useState } from "react";
import { validateEmail, validatePassword, confirmPassword } from "../components/FormValidation"; // Cambiado aquí
import InputField from "../components/InputField";
import "../../styles/register.css";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
    
        // Validación de los campos
        if (!validateEmail(email)) validationErrors.email = "Email no válido.";
        if (!validatePassword(password)) validationErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        if (!confirmPassword(password, confirmPasswordValue)) validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setLoading(true); // Indicar que la solicitud está en curso
            setSuccessMessage("");
            setErrorMessage("");
    
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/registro`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nombre_de_usuario: nombre, 
                        email,
                        contraseña: password
                    })
                });
                if (response.ok) {
                    setSuccessMessage("Registro exitoso");
                    
                    setNombre("");
                    setEmail("");
                    setPassword("");
                    setConfirmPasswordValue("");
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.mensaje || "Error en el registro");
                }
            } catch (error) {
                setErrorMessage("Error en el registro: " + error.message);
            } finally {
                setLoading(false); // Finaliza la carga
            }
        }
    };
    

    return (
        <div className="register-form">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <InputField label="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                {errors.nombre && <p className="error-text">{errors.nombre}</p>}

                <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <InputField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                {errors.password && <p className="error-text">{errors.password}</p>}

                <InputField label="Confirmar Contraseña" type="password" value={confirmPasswordValue} onChange={(e) => setConfirmPasswordValue(e.target.value)} placeholder="Confirmar Contraseña" />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>

                {successMessage && <p className="success-text">{successMessage}</p>}
                {errorMessage && <p className="error-text">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Register;