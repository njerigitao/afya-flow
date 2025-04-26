from flask import Flask
from models import db
from config import Config
from routes import main
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
app.register_blueprint(main, url_prefix='/api/v1')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
