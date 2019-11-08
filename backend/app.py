from flask import Flask, url_for, render_template, request, Response
from app.controllers.HomeController import HomeController
from app.controllers.ArticleController import ArticleController
from app.controllers.StaticFileController import StaticFileController
from flask_cors import CORS
import json

app = Flask(__name__, static_folder="../public")
cors = CORS(app)

with open('jsons/routes.json') as file:
    routes = json.load(file)
    for route in routes:
        endpoints = route['endpoint']
        if not isinstance(endpoints, list):
            endpoints = [endpoints]
        for endpoint in endpoints:
            print(route['controller'])
            print(route['action'])
            controller = eval(route['controller'])
            handler = getattr(controller , route["action"])
            methods = route["methods"]
            app.add_url_rule(endpoint, route['name'], handler, methods=methods)
        
     
if __name__ == "__main__":
    print app.static_url_path
    app.run(host="localhost", port=3001, debug=True)

