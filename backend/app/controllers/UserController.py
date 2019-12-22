import base64
import datetime
import json
from exceptions import (BadCredentialsException, EmptyResultException,
                        UserAlreadyRegisteredException, UserNotFoundException)

from flask import Response, request
from flask.helpers import make_response

from ..models.Model import Model
from ..models.User import User


class UserController:
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
        try:
            login = request.form['login']
            password = request.form['password']
            user = User.login(login,password)
            api_token = base64.b64encode(
                bytes(user.salt + str(user.id) + user.api_key, 'ascii'))
            user.api_token = api_token            
            response = make_response(user.toJSON())
            return response
        except (EmptyResultException, UserNotFoundException) :
            return {"errors": [{"error": "login_error" ,"message": "User not found"}]}, 200, {'Content-Type': 'application/json'}
        except (BadCredentialsException) : 
            return {"errors": [{"error": "login_error", "message": "Bad credentials"}]}, 200, {'Content-Type': 'application/json'}

    @staticmethod
    def register():
        try:
            email = request.form['email']
            password = request.form['password']
            username = request.form['username']
            success, user = User.register(email, username ,password)
            return user.toJSON()
        except EmptyResultException:
            return {"errors": [{"error": "register_error", "message": "User not found"}]}, 200, {'Content-Type': 'application/json'}
        except UserAlreadyRegisteredException:
            return {"errors": [{"error": "register_error", "message": "Email or username is already used"}]}, 200, {'Content-Type': 'application/json'}
