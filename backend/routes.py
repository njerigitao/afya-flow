from flask import Blueprint, request, jsonify
from models import db, Client, Program

main = Blueprint('main', __name__)

@main.route("/programs", methods=["POST"])
def create_program():
    name = request.json.get("name")
    program = Program(name=name)
    db.session.add(program)
    db.session.commit()
    return jsonify({"message": "Program created", "program": name})

@main.route("/clients", methods=["POST"])
def register_client():
    data = request.json
    client = Client(name=data["name"], gender=data.get("gender"), age=data.get("age"))
    db.session.add(client)
    db.session.commit()
    return jsonify({"message": "Client registered", "client_id": client.id})

@main.route("/clients/<int:id>/enroll", methods=["POST"])
def enroll_client(id):
    client = Client.query.get_or_404(id)
    program_ids = request.json.get("program_ids", [])
    for pid in program_ids:
        program = Program.query.get(pid)
        if program and program not in client.programs:
            client.programs.append(program)
    db.session.commit()
    return jsonify({"message": "Client enrolled in programs"})

@main.route("/clients/search", methods=["GET"])
def search_clients():
    name = request.args.get("name")
    clients = Client.query.filter(Client.name.ilike(f"%{name}%")).first()
    return jsonify([{"name": c.name, "age": c.age, "gender": c.gender, "programs": [program.name for program in client.programs]} for c in clients])

@main.route("/clients/<int:id>", methods=["GET"])
def client_profile(id):
    client = Client.query.get_or_404(id)
    return jsonify({
        "id": client.id,
        "name": client.name,
        "gender": client.gender,
        "age": client.age,
        "programs": [p.name for p in client.programs]
    })
