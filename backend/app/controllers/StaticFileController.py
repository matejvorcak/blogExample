from flask import send_from_directory

class StaticFileController:
    @staticmethod
    def index():
        return send_from_directory('../public', 'index.html')

    @staticmethod
    def getStyleFile(filename):
        return send_from_directory('../public', filename)

    @staticmethod
    def getJavascriptFile(filename):
        return send_from_directory('../public', filename)