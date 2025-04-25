from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Association Table
client_program = db.Table('client_program',
    db.Column('client_id', db.Integer, db.ForeignKey('clients.id')),
    db.Column('program_id', db.Integer, db.ForeignKey('programs.id'))
)

class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10))
    age = db.Column(db.Integer)
    programs = db.relationship('Program', secondary=client_program, backref='clients')

class Program(db.Model):
    __tablename__ = 'programs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
