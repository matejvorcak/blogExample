from .Model import Model


class User(Model):

    Model.columns = ["id", "name", "surname", "password"]
    id = None
    name = ""
    surname = ""
    password = ""

    def __init__(self, id=0, name="", surname="", password=""):
        self.id = id
        self.name = name
        self.surname = surname
        self.password = password
