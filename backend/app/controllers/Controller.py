
class Controller():
    pass


class OkResponse():
    data = {}


class ErrorResponse():
    errors = []
    

class ResponseRerror():
    propName = ""
    error = ""
    def __init__(self, propName, error):
        self.propName = propName
        self.error = error
