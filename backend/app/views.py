from app import app
from flask import Flask, current_app, jsonify, flash, render_template, json, request, redirect, session, url_for
from dotenv import load_dotenv
import pyrebase
import pandas as pd
import ast
import json
import os
import numpy as np

load_dotenv()

config = {
    "apiKey": os.getenv("API_KEY"),
    "authDomain": os.getenv("AUTH_DOMAIN"),
    "databaseURL": os.getenv("DATABASE_URL"),
    "storageBucket": os.getenv("STORAGE_BUCKET"),
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

@app.route('/')
def main():
    return "Hello world"

@app.route('/getData', methods=['GET'])
def getData():
    db_response = db.child("athlete_events").get().val()
    df = pd.DataFrame(db_response)
    converted_json = df.to_json(orient="records")
    return converted_json

@app.route('/getDataSorted', methods=['GET', 'POST'])
def getDataSorted():
    sortCol = request.args.get("col")
    sortOrder = request.args.get("order")
    db_response = db.child("athlete_events").get().val()
    df = pd.DataFrame(db_response)
    df.sort_values(by=sortCol, ascending=(sortOrder == 'asc'), inplace=True)
    df.reset_index(inplace=True, drop=True)
    converted_json = df.to_json(orient="records")
    return converted_json

@app.route('/getDataFiltered', methods=['GET', 'POST'])
def getDataFiltered():
    filterCol = request.args.get("filterCol")
    colType = request.args.get("type")
    startVal = request.args.get("startVal")
    matchString = request.args.get("matchString")
    endVal = request.args.get("endVal")
    db_response = db.child("athlete_events").get().val()
    df = pd.DataFrame(db_response)
    df = df[df[filterCol] != "NA"]
    df.drop_duplicates(inplace=True)
    if colType == 'string':
        df = df[df[filterCol].str.lower().str.contains(matchString.lower())]
    if colType == "number":
        df[filterCol] = pd.to_numeric(df[filterCol])
        df = df[(df[filterCol] >= int(startVal)) & (df[filterCol] <= int(endVal))]
        df.sort_values(by=filterCol, inplace=True)
    df.reset_index(inplace=True, drop=True)
    converted_json = df.to_json(orient="records")
    return converted_json

@app.route('/getDataStatistics', methods=['GET', 'POST'])
def getDataStatistics():
    columns = {
        "ID": "number",
        "Name": "string",
        "Sex": "string",
        "Age": "number",
        "Height": "number",
        "Weight": "number",
        "Team": "string",
        "NOC": "string",
        "Games": "string",
        "Year": "number",
        "Season": "string",
        "City": "string",
        "Sport": "string",
        "Event": "string",
        "Medal": "string",
    }
    db_response = db.child("athlete_events").get().val()
    df = pd.DataFrame(db_response)
    df = df[df[df.columns] != "NA"]
    result_dict = dict()
    for col in df.columns:
        if columns[col] == 'number':
            col_stats = dict(df[col].astype(np.float64).describe())
        else:
            col_stats = dict(df[col].describe())
            col_stats["count"] = np.float64(col_stats["count"])
            col_stats["unique"] = np.float64(col_stats["unique"])
            col_stats["freq"] = np.float64(col_stats["freq"])
        result_dict[col] = col_stats
    converted_json = json.dumps(result_dict)
    response_result = json.loads(converted_json)
    return response_result
