import React, { useState } from "react";
import { validateEmail, validatePassword } from "../components/FormValidation"; // Asegúrate de que estas funciones estén implementadas correctamente
import InputField from "../components/InputField";
import "../../styles/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(null); // Nuevo estado para manejar errores de inicio de sesión

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateEmail(email)) validationErrors.email = "Email no válido.";
        if (!validatePassword(password)) validationErrors.password = "La contraseña debe tener al menos 8 caracteres.";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Salir si hay errores de validación
        } else {
            setErrors({}); // Limpiar errores previos
            setLoginError(null); // Reiniciar error de inicio de sesión
            const response = await fetch(`${process.env.BACKEND_URL}api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: password }) // Asegúrate de que la clave sea "contraseña"
            });

            if (response.ok) {
                alert("Login exitoso");
                // Puedes redirigir o hacer algo más aquí
            } else {
                const errorData = await response.json(); // Captura el mensaje de error
                setLoginError(errorData.msg || "Error en el login"); // Mostrar mensaje de error
            }
        }
    };

    return (
        <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                <InputField
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                {loginError && <p className="error-text">{loginError}</p>} {/* Mostrar error de inicio de sesión */}

                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;