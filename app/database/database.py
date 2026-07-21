import mysql.connector


def get_connection():

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Elizabeth@20",
        database="CareerPilotDB"
    )

    return connection