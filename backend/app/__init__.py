from flask import Flask, render_template, json, request, redirect, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object('config')

from app import views