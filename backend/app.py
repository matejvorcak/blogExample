import json
import logging
import os
from datetime import timedelta

import flask
from flask import Flask, Response, render_template, request, url_for
from flask_cors import CORS
from flask_login import LoginManager


from app.controllers.ArticleController import ArticleController
from app.controllers.HomeController import HomeController
from app.controllers.StaticFileController import StaticFileController
from app.controllers.UserController import UserController

app = Flask(__name__, static_folder="../public/static")
app.secret_key = os.urandom(16)
cors = CORS(app, supports_credentials=True)
app.config['SESSION_TYPE'] = 'filesystem'

login_manager = LoginManager()
login_manager.init_app(app)

#handle backend routes
with open('jsons/routes/backend.json') as file:
    routes = json.load(file)
    for route in routes:
        endpoints = route['endpoint']
        if not isinstance(endpoints, list):
            endpoints = [endpoints]
        for endpoint in endpoints:
            controller = eval(route['controller'])
            handler = getattr(controller , route["action"])
            methods = route["methods"]
            app.add_url_rule(endpoint, route['name'], handler, methods=methods)


@app.after_request
def add_cors(resp):
    resp.headers['Access-Control-Allow-Origin'] = flask.request.headers.get(
        'Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET'
    resp.headers['Access-Control-Allow-Headers'] = flask.request.headers.get(
        'Access-Control-Request-Headers', 'Authorization')
    return resp


#handle frontend routes
with open('jsons/routes/frontend.json') as file:
    routes = json.load(file)
    for route in routes:
        endpoints = route['endpoint']
        if not isinstance(endpoints, list):
            endpoints = [endpoints]
        for endpoint in endpoints:
            handler = StaticFileController.index
            app.add_url_rule(endpoint, 'index', handler, methods=["GET"])
        
     
if __name__ == "__main__":
    app.run(host="localhost", port=3001, debug=True)
