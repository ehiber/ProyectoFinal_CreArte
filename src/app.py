import os
import stripe
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS

# Inicializar la aplicación Flask
app = Flask(__name__)

# Configuración de CORS (si el frontend está en un dominio diferente)
CORS(app)

# Registrar el Blueprint para las rutas API
app.register_blueprint(api, url_prefix='/api')

# Configuración del entorno
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app.url_map.strict_slashes = False

# Configuración de base de datos
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos y migraciones
db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

# Configurar Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Ruta para la creación de la sesión de pago
@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        YOUR_DOMAIN = os.getenv("FRONTEND_URL", "http://localhost:3000")  # Reemplaza con tu dominio

        # Crear una sesión de pago en Stripe
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'T-shirt',
                    },
                    'unit_amount': 2000,  # Precio en centavos, $20.00
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{YOUR_DOMAIN}/success",
            cancel_url=f"{YOUR_DOMAIN}/cancel",
        )

        # Devuelve el ID de la sesión de Stripe
        return jsonify(id=checkout_session.id)

    except Exception as e:
        return jsonify(error=str(e)), 500

# Agregar la interfaz de administración
setup_admin(app)
setup_commands(app)

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generar el sitemap con todos los endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Servir archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Evitar caché
    return response

# Ejecutar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
