import numbers
from exceptions import EmptyResultException

from functions import randomString

from ..db.DB import DB


class Model:

    primaryKey = "id"
    columns = []
    tableName = ""

    @staticmethod
    def query(query, bind = None):
        result = DB.query(query, bind)
        return result

    @classmethod
    def get(cls, id):
        query = "SELECT " + (", ".join(cls.columns)) + " FROM " + \
            cls.tableName + " WHERE " + cls.primaryKey + " = %s"
        result = Model.query("SELECT " + (", ".join(cls.columns)) + " FROM " + cls.tableName+ " WHERE "+ cls.primaryKey +" = %s", (id,)).getOne()
        if result == None:
            raise EmptyResultException
        model = cls()
        for key, value in result.items():
            setattr(model, key, value)
        return model

    @classmethod
    def getWhere(cls, cond):
        query = "SELECT " + (", ".join(cls.columns)) + \
            " FROM " + cls.tableName + " WHERE " + cond
        result = Model.query(query).getOne()
        
        if result == None:
            raise EmptyResultException

        model = cls()
        for key, value in result.items():
            setattr(model, key, value)
        return model

    def toJSON(self):
        return self.__dict__


    def save(self): 

        if getattr(self, self.primaryKey) == None:
            res = {k: v for k, v in self.__dict__.items() if v is not None}
            cols = []
            vals = []
            for key, value in res.items():
                cols += [key]
                if not isinstance(value, numbers.Number):
                    value = '"{}"'.format(value)
                vals += [value]

            cols = ", ".join(cols)
            vals = ", ".join(vals)
            Model.query("INSERT INTO {table} ({columns}) VALUES ({values})".format(
                table=self.tableName, columns=cols, values=vals))
        else :
            values = []
            for column in self.columns:
                val = getattr(self, column)
                if val == "None" or val == None :
                    continue
                if not isinstance(val, numbers.Number) :
                    val = '"{}"'.format(val) 
                values += ['{key}={value}'.format(key=column, value= val )] 
        
            values = ", ".join(values)
            Model.query("UPDATE {table} SET {values} WHERE {primaryKey}={id}".format(
                table=self.tableName, values=values, primaryKey=self.primaryKey ,id=getattr(self, self.primaryKey)))

