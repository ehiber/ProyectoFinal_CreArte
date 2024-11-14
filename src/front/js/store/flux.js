const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			cartItems: []
		},

		actions: {
			// Función de ejemplo
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},

			// Añadir curso al carrito
			addCourseToCart: (course) => {
				const currentCart = getStore().cartItems || [];
				const updatedCart = [...currentCart, { ...course, quantity: 1 }];
				setStore({ cartItems: updatedCart });
				localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda en localStorage
			},

			// Eliminar curso del carrito
			removeCourseFromCart: (courseId) => {
				const currentCart = getStore().cartItems || [];
				const updatedCart = currentCart.filter(item => item.id !== courseId);
				setStore({ cartItems: updatedCart });
				localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda en localStorage
			},

			// Actualizar carrito completo (para cambios de cantidad, etc.)
			updateCart: (updatedCart) => {
				setStore({ cartItems: updatedCart });
				localStorage.setItem("cart", JSON.stringify(updatedCart)); // Guarda en localStorage
			},

			// Obtener el conteo total de elementos en el carrito
			getCartItemCount: () => {
				const cartItems = getStore().cartItems || [];
				return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
			}
		}
	};
};

export default getState;