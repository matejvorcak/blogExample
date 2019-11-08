from ..models.Model import Model
from ..models.User import User


class HomeController:
    @staticmethod
    def index(name="joZo"):
        return User.get(8).name
