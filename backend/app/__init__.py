from flask import Flask, render_template, json, request, redirect, session

app = Flask(__name__)
app.config.from_object('config')

from app import views