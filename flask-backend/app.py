from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "database.db"))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_file

app.secret_key = 'supersecretkey'
db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('index.html', token='flask-react-app')



# Create database model
class Task(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True)
    task_title = db.Column(db.String(100))
    task_description = db.Column(db.Text)


if __name__ == '__main__':
    app.run(debug=True)
