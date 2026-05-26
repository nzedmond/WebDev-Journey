from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class BookItem(BaseModel):
  title: str
  author: str
  year: int | None=None
  isbn: str | None=None

book_list: list[dict] = []
next_id = 1

@app.get("/books")
async def get_books(skip: int = 0, limit: int = 10):
  return book_list[skip: skip + limit]

@app.get("/books/{book_id}")
async def get_book(book_id: int):

  for book in book_list:
    if book["id"] == book_id:
      return book
  raise HTTPException(status_code=404, detail="Book not found!")

@app.post("/books", status_code=201)
async def send_books(book: BookItem):
  global next_id
  new_book = {"id": next_id, **book.model_dump()}
  book_list.append(new_book)
  next_id += 1

  return new_book