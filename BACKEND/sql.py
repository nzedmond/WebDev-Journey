'''
    SQLite is a C library that provides a lightweight disk-based database that doesn't require a separate server process and allows accessing the database using a nonstandard variant of the SQL query language.
'''

import sqlite3
con = sqlite3.connect("tutorial.db") # returns a Connection object that represents the connection to the on-disk database.

cur = con.cursor() # use a database cursor to execute SQL statements and fetch results from SQL queries.

cur.execute("CREATE TABLE movie(title, year, score)") # create a database table, movie, with columns for title, year, and score.

res = cur.execute("SELECT name FROM sqlite_master")
print(res.fetchone()) # check if the table was created. Returns None if it wasn't, otherwise returns a tuple containing table name.

