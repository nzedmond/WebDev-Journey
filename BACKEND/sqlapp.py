import database

movie_list = [
    ("Arrival", 2026, 6.7),
    ("Pulp Fiction", 1992, 6.9),
    ("Mad Max: Fury Road", 1992, 9.2),
    ("Gladiator", 2017, 8.9),
    ("Pulp Fiction", 1992, 6.9),
    ("Get Out", 2002, 7.6),
    ("The Matrix", 1990, 8.2),
    ("Spirited Away", 2017, 7.1),
    ("The Matrix", 1990, 8.2),
    ("The Dark Knight", 1991, 7.3)
]

# database.add_list_of_records(movie_list)
# database.show_all()


database.remove_duplicates()
database.show_all()