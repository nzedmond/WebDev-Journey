'''
    SQLite is a C library that provides a lightweight disk-based database that doesn't require a separate server process and allows accessing the database using a nonstandard variant of the SQL query language.
'''

import sqlite3
con = sqlite3.connect("tutorial.db") # returns a Connection object that represents the connection to the on-disk database.

cur = con.cursor() # use a database cursor to execute SQL statements and fetch results from SQL queries.

# cur.execute("CREATE TABLE movie(title, year, score)") # create a database table, movie, with columns for title, year, and score.

res = cur.execute("SELECT name FROM sqlite_master")
print(res.fetchone()) # check if the table was created. Returns None if it wasn't, otherwise returns a tuple containing table name.

cur.execute("""
            INSERT INTO movie VALUES
                ('Project Hail Marry', 2025, 9.7),
                ('House of the Dragons', 2026, 9.9)
            """)
# the insert statement opens a transaction which needs to be committed before changes are saved in the database.

con.commit()

scores = cur.execute("SELECT score FROM movie")
print(scores.fetchall())

data = [
    ("The Last of Us", 2003, 7.6),
    ("Sinners", 2025, 8.7),
    ("The Lincoln Lawyer", 2002, 6.7),
]
cur.executemany("INSERT INTO movie VALUES(?, ?, ?)", data)
con.commit()

# ? placeholders are used to bind data to teh query. Always use placeholders instead of string formatting to bind python values to SQL statements to avoid SQL injection attacks.

for row in cur.execute("SELECT year, title FROM movie ORDER BY year"):
    print(row)
    
con.close()
new_con = sqlite3.connect("tutorial.db")
new_cur = new_con.cursor()
res = new_cur.execute("SELECT title, year FROM movie ORDER BY score DESC")
title, year = res.fetchone()
print(f'The highest scoring movie is {title}, released in {year}')

new_con.close()