from ..db.DB import DB

class Model:

    primaryKey = "id"
    columns = []

    @staticmethod
    def query(query, bind = None):
        result = DB.query(query, bind)
        return result

    @classmethod
    def get(cls, id):
        result = Model.query("SELECT " + (", ".join(Model.columns)) + " FROM USERS WHERE "+ Model.primaryKey +" = %s", (id,)).getOne()
        model = cls()
        for key, value in result.iteritems():
            setattr(model, key, value)
        return model