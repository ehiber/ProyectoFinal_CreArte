"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, User  # Asegúrate de que importas User, no Usuario
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import re
import os
from flask import Blueprint
import stripe
from api import api  # Este es el nombre correcto si usas __init__.py para exportar api

# Configuración de Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")  # Asegúrate de tener STRIPE_SECRET_KEY en tu .env

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.get_json()

        # Datos necesarios para crear la sesión de pago
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': data['product_name'],
                        },
                        'unit_amount': int(data['price'] * 100),  # El monto en centavos
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url="http://localhost:3000/success",  # URL de éxito
            cancel_url="http://localhost:3000/cancel",    # URL de cancelación
        )

        # Retorna la URL de la sesión para redirigir al usuario
        return jsonify({'id': checkout_session.id, 'url': checkout_session.url}), 200

    except Exception as e:
        print(f"Error al crear la sesión de pago: {e}")
        return jsonify({"error": str(e)}), 500


api = Blueprint('api', __name__)
bcrypt = Bcrypt()

# Permitir solicitudes CORS a esta API
CORS(api, supports_credentials=True)

# Validación de correo electrónico
def is_valid_email(email):
    regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(regex, email) is not None

# Ruta para restablecer la contraseña
@api.route('/restablecer-contraseña', methods=['PUT'])
def update_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')

    if not email or not new_password:
        return jsonify({"msg": "Email y nueva contraseña son requeridos"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    try:
        db.session.commit()
        return jsonify({"msg": "Contraseña actualizada exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al actualizar la contraseña", "error": str(e)}), 500

# Ruta existente que ya tienes
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Nuevo endpoint para el inicio de sesión
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son requeridos"}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Inicio de sesión exitoso", "user": user.serialize()}), 200
    else:
        return jsonify({"msg": "Credenciales inválidas"}), 401


# Endpoint para + un usuario
@api.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()

    # Validar los campos requeridos
    required_fields = ['nombre_de_usuario', 'email', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"mensaje": f"{field.replace('_', ' ').capitalize()} es requerido"}), 400

    # Validar el formato del email
    if not is_valid_email(data['email']):
        return jsonify({"mensaje": "El email no tiene un formato válido"}), 400

    # Verificar si el email ya está en uso
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"mensaje": "El email ya está en uso"}), 409

    # Encriptar la contraseña
    contraseña_encriptada = bcrypt.generate_password_hash(data["contraseña"]).decode('utf-8')

    # Crear un nuevo usuario
    nuevo_usuario = User(
        nombre_de_usuario=data['nombre_de_usuario'],
        email=data['email'],
        password=contraseña_encriptada,
        nombre=data.get('nombre'),  # Usar .get() para evitar KeyError
        sexo=data.get('sexo'),
        edad=data.get('edad')
    )

    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"mensaje": "Usuario registrado exitosamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"mensaje": "Error al registrar el usuario", "error": str(e)}), 500