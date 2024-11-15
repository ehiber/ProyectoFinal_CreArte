from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    nombre_de_usuario = db.Column(db.String(120), unique=True, nullable=False)
    nombre = db.Column(db.String(120), nullable=True) 
    sexo = db.Column(db.String(120), nullable=True)   
    edad = db.Column(db.Integer, nullable=True)         
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_de_usuario": self.nombre_de_usuario,
            "nombre": self.nombre,
            "sexo": self.sexo,
            "edad": self.edad,
            "email": self.email,
        }


class Product(db.Model):
    __tablename__ = 'products'  # Especifica el nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
        }