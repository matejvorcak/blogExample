import base64
import datetime
import json
from exceptions import *
from app.controllers.Controller import Controller

from flask import Response, request
from flask.helpers import make_response

from ..models.Model import Model
from ..models.User import User


class UserController(Controller):
    @staticmethod
    def me():
        try:
            # first, try to login using the api_key url arg
            api_token = request.args.get('api_token')
            if api_token:
                return User.getByApiToken(api_token).toJSON()
            # next, try to login using Basic Auth
            api_token = request.headers.get('Authorization')
            if api_token:
                return User.getByApiToken(api_token).toJSON()    
            
            return {"error": "Could not found Authorizatio token"}
        except EmptyResultException :
            return {"error":"user not found"}, 400, {'Content-Type': 'application/json'}

    @staticmethod
    def login():
            login = request.form['login']
            password = request.form['password']
            success, res = User.login(login,password)
            if success :
                api_token = base64.b64encode(
                    bytes(res.salt + str(res.id) + res.api_key, 'ascii'))
                res.api_token = api_token            
                return {
                    "status": "SUCCESS",
                    "data": res.toJSON()
                }
            else :
                return {
                    "status": "ERROR",
                    "errors": res
                }
    
    @staticmethod
    def register():
        email = request.form['email']
        password = request.form['password']
        username = request.form['username']
        success, res = User.register(email, username ,password)
        if success:
            return {
                "status": "SUCCESS",
                "data": res.toJSON()
            }
        else:
            return {
                "status": "ERROR",
                "errors": res
            }
