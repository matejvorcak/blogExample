import json
import mysql.connector
from mysql.connector import Error


class DB:
    info = ""
    cursor = None
    conn = None
    affectedRows = 0

    with open('jsons/config/backend.json') as file:
        config = json.load(file)
        host = config["database"]["host"]
        database = config["database"]["database"]
        user = config["database"]["user"]
        password = config["database"]["password"]

    def __init__(self):
        try:
            connection = mysql.connector.connect(host=self.host, database=self.database, user=self.user, password=self.password)

            if connection.is_connected():
                self.conn = connection
                self.db_Info = connection.get_server_info()
                self.cursor = connection.cursor(buffered=True, dictionary=True)

        except Error as e:
            print("Error while connecting to MySQL", e)

    @staticmethod
    def query(query, bind):
        db = DB()
        db.cursor.execute(query, bind)
        db.conn.commit()
        db.affectedRows = db.cursor.rowcount
        return db

    def getAll(self):
        return self.cursor.fetchall()

    def getOne(self):
        return self.cursor.fetchone()

    def getMany(self, size):
        return self.cursor.fetchmany(size)
