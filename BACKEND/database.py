import sqlite3
def show_all():
    conn = sqlite3.connect('tutorial.db')
    c = conn.cursor()
    
    c.execute("SELECT rowid, * FROM movie")
    items = c.fetchall()
    
    for item in items:
        print(item)

    conn.close()
    
def delete_record(value: tuple):
    conn = sqlite3.connect('tutorial.db')
    c = conn.cursor()
    c.execute("DELETE FROM movie WHERE title == ?", (value[0],))
    conn.commit()
    conn.close()
    
def delete_table():
    pass

def add_record(data: tuple):
    conn = sqlite3.connect('tutorial.db')
    c = conn.cursor()
    print(data)
    c.execute("INSERT INTO movie VALUES(?, ?, ?)", data)
    conn.commit()
    conn.close()
    

def add_list_of_records(list_data: list):
    conn = sqlite3.connect('tutorial.db')
    c = conn.cursor()
    
    c.executemany("INSERT INTO movie VALUES(?, ?, ?)", list_data)
    conn.commit()
    conn.close()

def remove_duplicates():
    con = sqlite3.connect('tutorial.db')
    c = con.cursor()
    
    c.execute("""
              DELETE FROM movie
              WHERE rowid NOT IN (
                  SELECT MIN(rowid)
                  FROM movie
                  GROUP BY title
              )
              """)
                
    con.commit()
    con.close()