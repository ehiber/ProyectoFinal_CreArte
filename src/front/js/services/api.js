// src/front/js/services/api.js
const API_URL = process.env.BACKEND_URL || "http://localhost:3001";

// Obtener categorías
export const getCategorias = async () => {
    try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error("Error fetching categories");
        const data = await response.json();
        return data; // Devuelve las categorías y subcategorías
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { categorias: [], subcategorias: [] }; // Devuelve valores predeterminados en caso de error
    }
};

// Obtener un producto por su ID
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error("Error fetching product");
        const data = await response.json();
        return data; // Devuelve el producto
    } catch (error) {
        console.error("Error fetching product:", error);
        return null; // Devuelve null en caso de error
    }
};

// Agregar producto al carrito
export const addToCart = async (productId, quantity = 1) => {
    try {
        const token = sessionStorage.getItem("token"); // Asegúrate de agregar el token en el encabezado si es necesario
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "" // Agrega el token si existe
            },
            body: JSON.stringify({ productId, quantity })
        });
        if (!response.ok) throw new Error("Error adding product to cart");
        const data = await response.json();
        return data; // Retorna la respuesta del servidor
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return { error: "Failed to add product to cart" }; // Devuelve un mensaje de error si algo falla
    }
};

// Obtener productos destacados
export const getProductosDestacados = async () => {
    try {
        const response = await fetch(`${API_URL}/productos_destacados`);
        if (!response.ok) throw new Error("Error fetching featured products");
        const data = await response.json();
        return data; // Devuelve los productos destacados y las imágenes del carrusel
    } catch (error) {
        console.error("Error fetching featured products:", error);
        return { productos: [], imagenes_carrusel: [] }; // Devuelve valores predeterminados en caso de error
    }
};

// Actualizar perfil de usuario
export const updateUser = async (id, userData) => {
    try {
        const token = sessionStorage.getItem("token"); // Asegúrate de agregar el token en el encabezado si es necesario
        const response = await fetch(`${API_URL}/api/usuario/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "" // Agrega el token si existe
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error("Error updating user");
        return true; // Retorna true si la actualización fue exitosa
    } catch (error) {
        console.error("Error updating user:", error);
        return false; // Devuelve false en caso de error
    }
};

// Eliminar cuenta de usuario
export const deleteUser = async (id) => {
    try {
        const token = sessionStorage.getItem("token"); // Asegúrate de agregar el token en el encabezado si es necesario
        const response = await fetch(`${API_URL}/api/usuario/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token ? `Bearer ${token}` : "" // Agrega el token si existe
            }
        });
        if (!response.ok) throw new Error("Error deleting account");
        return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
        console.error("Error deleting account:", error);
        return false; // Devuelve false en caso de error
    }
};
