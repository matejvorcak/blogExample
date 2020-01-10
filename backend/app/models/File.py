from .Model import Model
from exceptions import EmptyResultException

class File(Model):
    columns = ["id", "filename"]
    tableName = "FILES"

    def __init__(self, id=None, filename=None):
        self.id = id
        self.filename = None

    @staticmethod
    def get(id):
        try:
            res = super(File, File).get(id)
            return res
        except EmptyResultException :
            return File(id);

    def get_filename(self):
        return self.filename
