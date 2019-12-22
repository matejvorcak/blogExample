import base64
import hashlib
import json
import secrets
import time
from exceptions import *
from functions import randomString

from .Model import Model


class User(Model):

    Model.columns = ["id","username", "email", "first_name", "last_name", "password", "salt", "api_key", "created_at", "last_login"]
    private_columns = ["id", "salt","api_key","password"]
    Model.tableName = "USERS"

    def __init__(self, id=None, username=None, email=None, first_name=None, last_name=None, password=None, salt=None, api_key=None, created_at=None, last_login=""):
        self.id = id
        self.email = email
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.salt = salt
        self.created_at = created_at
        self.last_login = last_login
        self.api_key = api_key

    @staticmethod
    def login( login, password):
        try :
            fetch_user = User.getWhere("email = '{login}' OR username = '{login}'".format(login = login))
        except EmptyResultException :
            return False, {"login": "login is wrong"}
        fetch_password = fetch_user.password
        pw = hashlib.sha1(str(password + fetch_user.salt).encode("UTF-8")).hexdigest()
        if pw == fetch_password:
            db_api_key = secrets.token_urlsafe(32)[:32]
            fetch_user.api_key = db_api_key
            fetch_user.last_login = time.strftime('%Y-%m-%d %H:%M:%S')
            fetch_user.save()
            return True, fetch_user
        else:
            return False, {"password": "password is wrong"}
            

    @staticmethod   
    def register(email, username ,password):
        credentialsCheck = User.query('SELECT MAX(username=%s) AS isTakenUsername, MAX(email=%s) AS isTakenEmail FROM USERS',(username, email)).getOne()
        errors = {}
        if bool(credentialsCheck["isTakenUsername"]):
            errors["username"] = "username is taken."
        if bool(credentialsCheck["isTakenEmail"]):
            errors["email"] = "email is taken."
        if len(errors) > 0 :
            return False, errors
  
        db_salt = randomString(stringLength=6, withNumbers=True)
        db_email = email
        db_username = username
        db_password = hashlib.sha1(str(password + db_salt).encode("UTF-8")).hexdigest()
        newUser = User(
            salt=db_salt, 
            username=db_username, 
            password=db_password, 
            email=db_email, 
            last_login=time.strftime('%Y-%m-%d %H:%M:%S'),
            created_at=time.strftime('%Y-%m-%d %H:%M:%S')
        )
        newUser.save()
        user = User.login(email, password)
        return True, user

    @staticmethod
    def decode_api_token(api_token):
        base = base64.b64decode(str(api_token)).decode('UTF-8')
        salt = base[:6]
        api_key = base[-32:]
        base = base.replace(salt, '')
        base = base.replace(api_key, '')
        id_ = base
        return salt, id_, api_key

    @staticmethod
    def getByApiToken(api_token):
        salt, user_id, api_key = User.decode_api_token(api_token)
        user = User.getWhere("salt = '{salt}' AND id = {user_id} AND api_key = '{api_key}'".format(salt=salt, user_id=user_id, api_key=api_key))
        return user

    def toJSON(self):
        user_dict = self.__dict__
        for key in self.private_columns:
            del user_dict[key]
        return user_dict

    def update(self, values):
        User.query("UPDATE {table} SET {values} WHERE id={user_id}".format(
                table=User.tableName, values=values, user_id = self.id))
