> Used Claude AI to design a 30 days curriculum on foundations of Backend engineering. I'm already familiar with the frontend, but the backend has always been so obscure to me. Since I have exactly 30 days without classes and work, I decided to see if I can master the foundations of backend and start building real apps. May the lord be with me. 


# 30-Day Python Backend Engineering Curriculum

> **Prerequisites:** Comfortable with Python (variables, functions, classes, data structures, file I/O).
> **Daily commitment:** 3–4 hours minimum (1 hour learning, 2–3 hours coding).
> **Framework:** FastAPI (modern, fast, excellent docs, industry-relevant).
> **Database:** PostgreSQL (primary), Redis (caching intro).
> **Tooling:** VS Code, Postman/Insomnia, Git, Docker.

---

## Setup (Do This Before Day 1)

Install the following on your machine:

- Python 3.11+ → https://www.python.org/downloads/
- VS Code → https://code.visualstudio.com/
- PostgreSQL → https://www.postgresql.org/download/
- Git → https://git-scm.com/
- Docker Desktop → https://www.docker.com/products/docker-desktop/
- Postman → https://www.postman.com/downloads/
- A terminal you're comfortable with (iTerm2, Windows Terminal, etc.)

Create a GitHub account if you don't have one. You'll push every project there.

---

## WEEK 1 — HTTP, APIs & Your First Server (Days 1–7)

### Day 1: How the Web Works

**Learn:**

- The client-server model — what happens when you type a URL and press Enter
- HTTP protocol basics: request/response cycle, methods (GET, POST, PUT, PATCH, DELETE), status codes (200, 201, 400, 401, 403, 404, 500), headers, body
- JSON as the data format for APIs
- What REST means (resources, endpoints, statelessness)

**Resources:**

- MDN HTTP Overview → https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
- HTTP Status Codes Reference → https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- REST API Tutorial → https://restfulapi.net/

**Exercise:**

1. Open your terminal. Use `curl` to make a GET request to `https://jsonplaceholder.typicode.com/posts/1`. Read the response headers and body. Identify the status code, content-type, and the JSON structure.
2. Use `curl -X POST` to create a new post on that same API. Send a JSON body with `title`, `body`, and `userId`.
3. Write a one-page cheat sheet (in a markdown file) summarizing every HTTP method, when to use it, and which status codes pair with it. Commit it to a new GitHub repo called `backend-30-days`.

---

### Day 2: Python Virtual Environments & FastAPI Hello World

**Learn:**

- Why virtual environments matter (isolation, reproducibility)
- `venv` and `pip` workflow
- What FastAPI is and why it's a great choice (async-native, type hints, auto-docs)
- Your first FastAPI app: a single GET endpoint that returns JSON
- Running with `uvicorn`

**Resources:**

- FastAPI Official Tutorial → https://fastapi.tiangolo.com/tutorial/
- Python venv docs → https://docs.python.org/3/library/venv.html

**Exercise:**

1. Create a new project folder. Set up a virtual environment, activate it, install `fastapi` and `uvicorn[standard]`.
2. Write a `main.py` that has:
   - A root endpoint `GET /` returning `{"message": "Hello, Backend World!"}`
   - A `GET /health` endpoint returning `{"status": "ok"}`
3. Run it with `uvicorn main:app --reload` and test both endpoints in your browser and with `curl`.
4. Visit `http://localhost:8000/docs` — explore the auto-generated Swagger UI. This is one of FastAPI's killer features.

---

### Day 3: Path Parameters, Query Parameters & Request Bodies

**Learn:**

- Path parameters: `/users/{user_id}` — dynamic URL segments
- Query parameters: `/items?skip=0&limit=10` — filtering/pagination
- Request bodies with Pydantic models — type-safe, validated JSON input
- How FastAPI uses Python type hints for automatic validation
- Pydantic `BaseModel` basics

**Resources:**

- FastAPI Path Parameters → https://fastapi.tiangolo.com/tutorial/path-params/
- FastAPI Query Parameters → https://fastapi.tiangolo.com/tutorial/query-params/
- FastAPI Request Body → https://fastapi.tiangolo.com/tutorial/body/
- Pydantic docs → https://docs.pydantic.dev/latest/

**Exercise:**

1. Build a "Book Store" API with the following endpoints:
   - `GET /books` — returns a list of books (hardcoded list of dicts for now). Support `skip` and `limit` query parameters.
   - `GET /books/{book_id}` — returns a single book by ID. Return 404 if not found.
   - `POST /books` — accepts a JSON body with `title`, `author`, `year`, and `isbn`. Use a Pydantic model for validation. Add the book to your in-memory list.
2. Test invalid inputs: What happens if you POST without a required field? What if `year` is a string instead of an integer? Note how FastAPI auto-validates.

---

### Day 4: Response Models, Status Codes & Error Handling

**Learn:**

- Response models: controlling what your API returns (hiding internal fields)
- Setting custom status codes (201 for creation, 204 for deletion)
- `HTTPException` for returning proper error responses
- Custom exception handlers
- The difference between 4xx (client errors) and 5xx (server errors)

**Resources:**

- FastAPI Response Model → https://fastapi.tiangolo.com/tutorial/response-model/
- FastAPI Handling Errors → https://fastapi.tiangolo.com/tutorial/handling-errors/

**Exercise:**

1. Extend your Book Store API:
   - Add a `BookResponse` model that excludes internal fields (e.g., an internal `_created_at` timestamp).
   - Add `PUT /books/{book_id}` — update a book. Return 404 if not found. Return 200 with the updated book.
   - Add `DELETE /books/{book_id}` — delete a book. Return 204 on success.
   - Add a custom exception handler that catches all `ValueError` exceptions and returns a clean JSON error response.
2. Test every endpoint with Postman. Create a Postman collection with all your endpoints organized. Save it.

---

### Day 5: Project Structure, Routers & Middleware

**Learn:**

- Why flat files don't scale — organizing code into modules
- FastAPI `APIRouter` for grouping related endpoints
- Middleware: what it is, how requests flow through middleware layers
- CORS middleware (why browsers block cross-origin requests)
- Logging middleware (tracking every request)

**Resources:**

- FastAPI Bigger Applications → https://fastapi.tiangolo.com/tutorial/bigger-applications/
- FastAPI Middleware → https://fastapi.tiangolo.com/tutorial/middleware/
- FastAPI CORS → https://fastapi.tiangolo.com/tutorial/cors/

**Exercise:**

1. Refactor your Book Store into this structure:
   ```
   app/
   ├── main.py          (app creation, middleware, router includes)
   ├── routers/
   │   ├── books.py     (all book endpoints)
   │   └── health.py    (health check endpoint)
   ├── models/
   │   └── book.py      (Pydantic models)
   └── utils/
       └── logger.py    (logging config)
   ```
2. Add CORS middleware that allows all origins (for development).
3. Write a custom middleware that logs every request's method, path, and response time in milliseconds. Print it to the console.

---

### Day 6: Dependency Injection & Configuration

**Learn:**

- FastAPI's dependency injection system (`Depends`)
- Why DI matters (testability, reusability, separation of concerns)
- Managing configuration with environment variables
- Using `pydantic-settings` for typed configuration
- `.env` files and `python-dotenv`

**Resources:**

- FastAPI Dependencies → https://fastapi.tiangolo.com/tutorial/dependencies/
- Pydantic Settings → https://docs.pydantic.dev/latest/concepts/pydantic_settings/

**Exercise:**

1. Create a `config.py` that reads from environment variables using `pydantic-settings`:
   - `APP_NAME`, `DEBUG`, `DATABASE_URL`, `SECRET_KEY`
2. Create a dependency function `get_settings()` that returns the config and inject it into an endpoint.
3. Create a dependency that simulates a "current user" by reading a header (`X-User-Id`). If the header is missing, raise a 401. Inject this into a `GET /me` endpoint.
4. Create a `.env` file and a `.env.example` (with placeholder values). Add `.env` to `.gitignore`.

---

### Day 7: Week 1 Mini-Project — Task Manager API (In-Memory)

**Consolidation day.** Build from scratch without looking at previous code.

**Build a Task Manager API with:**

- Endpoints: CRUD for tasks (`GET /tasks`, `GET /tasks/{id}`, `POST /tasks`, `PUT /tasks/{id}`, `DELETE /tasks/{id}`)
- Each task has: `id`, `title`, `description`, `completed` (boolean), `priority` (low/medium/high), `created_at`
- Query params: filter by `completed` status, filter by `priority`, pagination with `skip`/`limit`
- Proper response models, status codes, error handling
- Organized project structure with routers, models, config
- Middleware for logging and CORS
- A dependency that validates an `X-API-Key` header against a key stored in config

**Commit and push to GitHub with a README explaining how to run it.**

---

## WEEK 2 — Databases & Data Modeling (Days 8–14)

### Day 8: SQL Fundamentals

**Learn:**

- Relational database concepts: tables, rows, columns, primary keys, foreign keys
- Core SQL: `SELECT`, `INSERT`, `UPDATE`, `DELETE`
- Filtering with `WHERE`, sorting with `ORDER BY`, `LIMIT`/`OFFSET`
- Joins: `INNER JOIN`, `LEFT JOIN` — when and why
- Aggregates: `COUNT`, `SUM`, `AVG`, `GROUP BY`

**Resources:**

- SQLBolt (interactive SQL tutorial) → https://sqlbolt.com/
- PostgreSQL Tutorial → https://www.postgresqltutorial.com/
- Mode SQL Tutorial → https://mode.com/sql-tutorial

**Exercise:**

1. Complete all lessons on SQLBolt (lessons 1–18). This is the single best free SQL exercise set.
2. Connect to your local PostgreSQL using `psql` or pgAdmin. Create a database called `taskmanager`.
3. Write SQL to create a `tasks` table with columns: `id` (serial primary key), `title` (varchar, not null), `description` (text), `completed` (boolean, default false), `priority` (varchar), `created_at` (timestamp, default now).
4. Insert 5 tasks manually. Write queries to: select all incomplete tasks, count tasks by priority, find the most recent task.

---

### Day 9: Advanced SQL & Schema Design

**Learn:**

- Data types in PostgreSQL (text, integer, boolean, timestamp, UUID, JSONB)
- Indexes: what they are, when to create them, the trade-offs
- Constraints: `UNIQUE`, `NOT NULL`, `CHECK`, `DEFAULT`
- Table relationships: one-to-many, many-to-many (junction tables)
- Database normalization basics (1NF, 2NF, 3NF — know what they mean, don't overthink it)

**Resources:**

- PostgreSQL Data Types → https://www.postgresql.org/docs/current/datatype.html
- Database Normalization Explained → https://www.guru99.com/database-normalization.html

**Exercise:**

1. Design a schema for a "Project Management" system:
   - `users` table (id, email, name, created_at)
   - `projects` table (id, name, description, owner_id → users)
   - `tasks` table (id, title, description, status, priority, project_id → projects, assignee_id → users, created_at, updated_at)
   - `tags` table and a `task_tags` junction table (many-to-many)
2. Write the SQL `CREATE TABLE` statements with proper constraints and foreign keys.
3. Insert sample data: 3 users, 2 projects, 10 tasks, 5 tags. Write a query that returns all tasks for a project with the assignee's name and all tags per task (hint: you'll need joins and possibly string aggregation).

---

### Day 10: SQLAlchemy ORM Basics

**Learn:**

- What an ORM is and why you'd use one (vs raw SQL)
- SQLAlchemy 2.0 style: `DeclarativeBase`, `Mapped`, `mapped_column`
- Defining models (Python classes that map to database tables)
- Creating a database engine and session
- Basic CRUD with SQLAlchemy: `session.add()`, `session.query()`, `session.delete()`, `session.commit()`

**Resources:**

- SQLAlchemy 2.0 Tutorial → https://docs.sqlalchemy.org/en/20/tutorial/
- SQLAlchemy ORM Quick Start → https://docs.sqlalchemy.org/en/20/orm/quickstart.html

**Exercise:**

1. In your project, install `sqlalchemy` and `psycopg2-binary`.
2. Create a `database.py` module that sets up the engine and session factory pointing to your local PostgreSQL.
3. Create SQLAlchemy models for `User` and `Task` (with a foreign key relationship).
4. Write a standalone Python script (not an API endpoint yet) that:
   - Creates the tables
   - Inserts 3 users and 5 tasks
   - Queries all tasks for a specific user
   - Updates a task's status
   - Deletes a task
   - Prints results to the console

---

### Day 11: Connecting FastAPI to PostgreSQL

**Learn:**

- The `Depends` + `get_db` pattern (database session as a dependency)
- Yield dependencies for proper session cleanup
- Repository pattern (separating database logic from endpoint logic)
- Pagination in the database layer (`offset`/`limit`)
- Handling `IntegrityError` (duplicate entries, foreign key violations)

**Resources:**

- FastAPI SQL Databases → https://fastapi.tiangolo.com/tutorial/sql-databases/

**Exercise:**

1. Connect your Task Manager API to PostgreSQL. Replace all in-memory storage with real database operations.
2. Create a `repositories/` folder with a `task_repo.py` that has functions: `get_tasks()`, `get_task_by_id()`, `create_task()`, `update_task()`, `delete_task()`.
3. Update all your router endpoints to use the repository functions with the injected DB session.
4. Test with Postman: create tasks, retrieve them, update, delete. Verify the data persists by restarting your server and checking that the tasks are still there.

---

### Day 12: Alembic Database Migrations

**Learn:**

- Why migrations matter (schema changes in production, team collaboration)
- Alembic: setup, configuration, generating migrations, running them
- Auto-generating migrations from model changes
- Upgrade and downgrade commands
- Migration best practices (review auto-generated code, never edit production data in migrations)

**Resources:**

- Alembic Tutorial → https://alembic.sqlalchemy.org/en/latest/tutorial.html
- FastAPI + Alembic guide → https://testdriven.io/blog/fastapi-sqlmodel/#alembic

**Exercise:**

1. Install `alembic`. Run `alembic init alembic` in your project.
2. Configure `alembic/env.py` to use your SQLAlchemy models and database URL.
3. Generate your first migration: `alembic revision --autogenerate -m "create tasks table"`. Review the generated file.
4. Run `alembic upgrade head` to apply it.
5. Now add a new field to your Task model: `due_date` (optional datetime). Generate a new migration, review it, apply it. Then practice rolling back with `alembic downgrade -1`.

---

### Day 13: Database Relationships & Querying Patterns

**Learn:**

- One-to-many relationships in SQLAlchemy (`relationship()`, `back_populates`)
- Many-to-many with association tables
- Eager loading vs lazy loading (the N+1 query problem)
- `joinedload`, `selectinload` for efficient querying
- Filtering, ordering, and complex queries with SQLAlchemy

**Resources:**

- SQLAlchemy Relationships → https://docs.sqlalchemy.org/en/20/orm/relationships.html
- SQLAlchemy Loading Strategies → https://docs.sqlalchemy.org/en/20/orm/queryguide/relationships.html

**Exercise:**

1. Expand your schema: Add a `User` model and a `Category` model. Tasks belong to a user (one-to-many) and can have multiple categories (many-to-many).
2. Create endpoints:
   - `GET /users/{user_id}/tasks` — all tasks for a user
   - `POST /tasks/{task_id}/categories` — assign a category to a task
   - `GET /tasks?category=work&assignee=1` — filter tasks by category name and assignee
3. Use `joinedload` to avoid N+1 queries when fetching tasks with their categories.
4. Add a `GET /stats` endpoint that returns: total tasks, tasks by status, tasks by priority, tasks per user (use SQL aggregates via SQLAlchemy).

---

### Day 14: Week 2 Mini-Project — Blog API with Full Database

**Build a Blog API from scratch:**

- Models: `User`, `Post`, `Comment`, `Tag` (Post ↔ Tag is many-to-many)
- Endpoints:
  - Users: register (just create, no auth yet), list users
  - Posts: CRUD with author relationship, filter by tag, pagination
  - Comments: create comment on a post, list comments for a post
  - Tags: create tag, list tags, get posts by tag
- Alembic migrations for the entire schema
- Repository pattern for all database operations
- Proper error handling (404 for not found, 409 for duplicates)
- Structured project layout

**Push to GitHub with a README and an `alembic/` directory.**

---

## WEEK 3 — Authentication, Security & Testing (Days 15–21)

### Day 15: Password Hashing & User Registration

**Learn:**

- Why you never store plaintext passwords
- Hashing vs encryption (one-way vs two-way)
- `bcrypt` via `passlib` for password hashing
- Salt: what it is and why it matters
- Building a registration endpoint that hashes passwords before storing

**Resources:**

- FastAPI Security → https://fastapi.tiangolo.com/tutorial/security/
- OWASP Password Storage Cheat Sheet → https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
- Passlib docs → https://passlib.readthedocs.io/en/stable/

**Exercise:**

1. Install `passlib[bcrypt]`. Create a `utils/security.py` with `hash_password()` and `verify_password()` functions.
2. Add a `POST /auth/register` endpoint that accepts email and password, hashes the password, stores the user in the database.
3. Verify it works: register a user, then check the database directly — you should see a hashed password, never the plaintext.
4. Try registering with the same email twice. Handle the `IntegrityError` and return a 409 Conflict.

---

### Day 16: JWT Authentication

**Learn:**

- What JWTs are: header, payload, signature
- Access tokens vs refresh tokens
- Token expiration and why it matters
- The login flow: verify credentials → issue token → client sends token on subsequent requests
- FastAPI's `OAuth2PasswordBearer` and `OAuth2PasswordRequestForm`

**Resources:**

- FastAPI OAuth2 with JWT → https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/
- JWT.io (decode and inspect tokens) → https://jwt.io/
- python-jose library → https://github.com/mpdavis/python-jose

**Exercise:**

1. Install `python-jose[cryptography]`. Create functions: `create_access_token(data, expires_delta)` and `decode_access_token(token)`.
2. Add `POST /auth/login` — accepts email/password, verifies credentials, returns a JWT.
3. Create a `get_current_user` dependency that extracts and validates the JWT from the `Authorization: Bearer <token>` header. If invalid or expired, return 401.
4. Protect your task endpoints: only authenticated users can create/update/delete tasks. Listing tasks remains public.
5. Test the full flow in Postman: register → login → use token → access protected endpoints. Try with an expired or invalid token.

---

### Day 17: Authorization & Role-Based Access Control

**Learn:**

- Authentication vs authorization (who are you vs what can you do)
- Role-based access control (RBAC): admin, editor, viewer
- Implementing roles in your User model
- Permission dependencies in FastAPI
- Ownership checks (users can only edit their own resources)

**Resources:**

- FastAPI Security Scopes → https://fastapi.tiangolo.com/advanced/security/oauth2-scopes/
- OWASP Authorization Cheat Sheet → https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html

**Exercise:**

1. Add a `role` field to your User model (enum: `admin`, `user`).
2. Create a dependency `require_role(roles: list)` that checks if the current user's role is in the allowed list. If not, return 403 Forbidden.
3. Rules:
   - Anyone can read posts and comments.
   - Only authenticated users can create posts/comments.
   - Users can only edit/delete their own posts.
   - Admins can edit/delete any post.
4. Write a dependency `get_post_with_permission(post_id, current_user)` that loads the post and checks ownership or admin status.
5. Test all permission scenarios in Postman. Document the access control rules in your README.

---

### Day 18: Input Validation & Common Security Vulnerabilities

**Learn:**

- SQL injection: what it is, how ORMs prevent it, raw queries that are still vulnerable
- XSS and how it relates to backend (sanitizing output)
- CSRF basics
- Rate limiting to prevent brute-force attacks
- Input validation beyond types: string length limits, regex patterns, enum constraints
- The `Field()` validator in Pydantic

**Resources:**

- OWASP Top 10 → https://owasp.org/www-project-top-ten/
- OWASP API Security Top 10 → https://owasp.org/www-project-api-security/
- FastAPI Security Tips → https://fastapi.tiangolo.com/tutorial/security/

**Exercise:**

1. Add strict validation to all your Pydantic models:
   - `title`: min 3 chars, max 200 chars
   - `email`: must be a valid email format (use `EmailStr` from pydantic)
   - `password`: min 8 chars, must contain a number and a special character (use a custom validator)
   - `priority`: must be one of the allowed enum values
2. Install `slowapi` and add rate limiting: max 5 login attempts per minute per IP.
3. Write a deliberately vulnerable raw SQL query (in a test file, not in production code). Then write the safe version using parameterized queries. Understand the difference.
4. Add a `Content-Security-Policy` header via middleware.

---

### Day 19: Writing Tests with Pytest

**Learn:**

- Why testing matters for backend code
- `pytest` basics: test functions, assertions, fixtures
- Testing FastAPI with `TestClient` (from `httpx`)
- Fixtures for database setup/teardown (test database, not production!)
- The testing pyramid: unit tests, integration tests, end-to-end tests

**Resources:**

- FastAPI Testing → https://fastapi.tiangolo.com/tutorial/testing/
- Pytest docs → https://docs.pytest.org/en/stable/
- Real Python Pytest Tutorial → https://realpython.com/pytest-python-testing/

**Exercise:**

1. Install `pytest` and `httpx`. Create a `tests/` directory.
2. Create a `conftest.py` with:
   - A fixture that creates a test database (SQLite in-memory is fine for now)
   - A fixture that provides a `TestClient` with the test database
   - A fixture that creates a test user and returns an auth token
3. Write tests for:
   - `test_create_task` — POST a task, assert 201 and correct response body
   - `test_get_task_not_found` — GET a nonexistent task, assert 404
   - `test_create_task_invalid_data` — POST with missing fields, assert 422
   - `test_protected_endpoint_no_token` — access without auth, assert 401
   - `test_user_cannot_delete_others_task` — assert 403
4. Run `pytest -v` and ensure all tests pass.

---

### Day 20: Integration Testing & Test Coverage

**Learn:**

- Integration tests: testing the full request → database → response cycle
- Test coverage: what it measures, what percentage to aim for (~80% is a good target)
- `pytest-cov` for coverage reports
- Testing edge cases: empty strings, very long inputs, concurrent requests
- Mocking external dependencies

**Resources:**

- Pytest Coverage → https://pytest-cov.readthedocs.io/en/latest/
- FastAPI Testing Advanced → https://fastapi.tiangolo.com/advanced/testing-dependencies/

**Exercise:**

1. Install `pytest-cov`. Run `pytest --cov=app --cov-report=html`. Open the HTML report and identify untested code paths.
2. Write integration tests for:
   - The full auth flow: register → login → use token → create task → get task
   - Pagination: create 20 tasks, test `skip=0&limit=10`, `skip=10&limit=10`
   - Filter combinations: by status, by priority, by both
   - Edge cases: empty title, title with 500 characters, negative skip value
3. Get your test coverage above 75%.
4. Add a `Makefile` or `scripts` section in `pyproject.toml` with commands: `test`, `test-cov`, `lint`.

---

### Day 21: Week 3 Mini-Project — Secure Notes API

**Build a "Secure Notes" API from scratch:**

- User registration and login with JWT
- Users can create, read, update, delete their own private notes
- Notes have: title, content, tags (many-to-many), is_pinned, created_at, updated_at
- Notes are private by default — users cannot see each other's notes
- Admin role can see all notes (read-only)
- Full input validation with strict constraints
- Rate limiting on auth endpoints
- Test suite with at least 15 tests covering auth, CRUD, permissions, validation, and edge cases
- Alembic migrations
- 80%+ test coverage

**Push to GitHub with README, test instructions, and migration instructions.**

---

## WEEK 4 — Deployment, Docker & Capstone (Days 22–30)

### Day 22: Environment Management & Logging

**Learn:**

- Development vs staging vs production environments
- The 12-Factor App methodology (especially config, logging, backing services)
- Structured logging with Python's `logging` module
- Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- Why `print()` isn't logging

**Resources:**

- 12-Factor App → https://12factor.net/
- Python Logging HOWTO → https://docs.python.org/3/howto/logging.html
- Structlog library → https://www.structlog.org/en/stable/

**Exercise:**

1. Replace all `print()` statements with proper logging. Configure log levels via environment variable.
2. Add structured logging that includes: timestamp, request ID (generate a UUID per request via middleware), method, path, status code, response time.
3. Create three config presets: `development` (DEBUG level, SQLite), `testing` (WARNING level, SQLite in-memory), `production` (INFO level, PostgreSQL, no debug mode).
4. Write a log that captures every 500 error with full traceback.

---

### Day 23: Docker Fundamentals

**Learn:**

- What containers are and why they matter (consistency, isolation, portability)
- Dockerfile: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`
- Building an image, running a container
- Docker Compose: multi-container setups (app + database)
- Volumes for database persistence
- `.dockerignore` file

**Resources:**

- Docker Get Started → https://docs.docker.com/get-started/
- Docker Compose docs → https://docs.docker.com/compose/
- Testdriven.io FastAPI + Docker → https://testdriven.io/blog/fastapi-docker-traefik/

**Exercise:**

1. Write a `Dockerfile` for your FastAPI app:
   - Use `python:3.11-slim` as base
   - Copy requirements, install dependencies
   - Copy application code
   - Run with `uvicorn`
2. Write a `docker-compose.yml` with two services:
   - `web`: your FastAPI app (port 8000)
   - `db`: PostgreSQL (port 5432, with a named volume for data persistence)
3. Run `docker compose up --build`. Verify your API works at `localhost:8000`.
4. Run your tests inside the Docker container: `docker compose exec web pytest`.

---

### Day 24: Background Tasks & Async Basics

**Learn:**

- Sync vs async in Python: `async def`, `await`
- When to use async (I/O-bound tasks: database queries, HTTP calls, file operations)
- FastAPI's `BackgroundTasks` for fire-and-forget operations
- Practical use cases: sending emails, processing uploads, generating reports
- `asyncio` basics

**Resources:**

- FastAPI Async → https://fastapi.tiangolo.com/async/
- FastAPI Background Tasks → https://fastapi.tiangolo.com/tutorial/background-tasks/
- Real Python Asyncio Walkthrough → https://realpython.com/async-io-python/

**Exercise:**

1. Convert your database operations to async using `sqlalchemy[asyncio]` and `asyncpg`. Update `database.py` to use `create_async_engine` and `AsyncSession`.
2. Create a background task that "sends a welcome email" (just log it for now) when a user registers.
3. Create a `POST /reports/generate` endpoint that kicks off a background task to "generate a report" (simulate with `asyncio.sleep(5)` and writing to a file), returning 202 Accepted immediately.
4. Add a `GET /reports/{report_id}/status` that checks if the report file exists.

---

### Day 25: Caching with Redis

**Learn:**

- What caching is and why it matters (reducing database load, faster responses)
- Redis: key-value store, data types (strings, hashes, lists, sets)
- Cache-aside pattern (check cache → miss → query DB → store in cache)
- Cache invalidation strategies (TTL, explicit invalidation on write)
- When NOT to cache (frequently changing data, personalized content)

**Resources:**

- Redis Quick Start → https://redis.io/docs/getting-started/
- Redis Python client → https://redis-py.readthedocs.io/en/stable/
- Caching strategies overview → https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/

**Exercise:**

1. Add Redis to your `docker-compose.yml`. Install `redis` Python package.
2. Create a `cache.py` utility with `get_cache(key)`, `set_cache(key, value, ttl)`, `delete_cache(key)`.
3. Cache the `GET /posts` endpoint: first request hits the DB and stores the result in Redis with a 60-second TTL. Subsequent requests serve from cache.
4. Invalidate the cache when a post is created, updated, or deleted.
5. Add a `X-Cache: HIT` or `X-Cache: MISS` response header so you can observe caching behavior.

---

### Day 26: API Documentation & Versioning

**Learn:**

- OpenAPI specification: what FastAPI generates for you
- Customizing your API docs: descriptions, tags, examples
- API versioning strategies: URL path (`/v1/`), header, query parameter
- Deprecating endpoints gracefully
- Writing good API documentation (for other developers)

**Resources:**

- FastAPI Metadata and Docs URLs → https://fastapi.tiangolo.com/tutorial/metadata/
- FastAPI Schema Extra Examples → https://fastapi.tiangolo.com/tutorial/schema-extra-example/
- API Versioning Best Practices → https://www.freecodecamp.org/news/how-to-version-a-rest-api/

**Exercise:**

1. Add detailed descriptions, tags, and example request/response bodies to every endpoint.
2. Implement URL-based versioning: move your current endpoints under `/api/v1/`. Create the router structure:
   ```
   app/
   ├── api/
   │   ├── v1/
   │   │   ├── routers/
   │   │   │   ├── tasks.py
   │   │   │   ├── users.py
   │   │   │   └── auth.py
   │   │   └── __init__.py
   │   └── __init__.py
   ```
3. Mark one endpoint as deprecated using FastAPI's `deprecated=True` parameter.
4. Visit your `/docs` page. It should now be beautifully organized with tags, descriptions, and examples.

---

### Day 27: CI/CD Basics with GitHub Actions

**Learn:**

- What CI/CD is: Continuous Integration / Continuous Deployment
- GitHub Actions: workflows, jobs, steps, triggers
- Running tests automatically on every push
- Linting with `ruff` or `flake8`
- The concept of a deployment pipeline

**Resources:**

- GitHub Actions Quickstart → https://docs.github.com/en/actions/quickstart
- GitHub Actions for Python → https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python
- Ruff (fast Python linter) → https://docs.astral.sh/ruff/

**Exercise:**

1. Install `ruff`. Run it on your project and fix all linting issues.
2. Create `.github/workflows/ci.yml` that:
   - Triggers on push to `main` and on pull requests
   - Sets up Python 3.11
   - Installs dependencies
   - Runs `ruff check .`
   - Runs `pytest` with coverage
   - Fails the build if tests fail or coverage drops below 75%
3. Push to GitHub. Watch the action run in the "Actions" tab.
4. Create a branch, make a change that breaks a test, push it, and see the CI fail. Fix it and see it pass.

---

### Day 28: Deploying to the Cloud

**Learn:**

- Deployment options for Python apps: Railway, Render, Fly.io, AWS (ECS, Lambda), GCP (Cloud Run)
- Environment variables in production
- Managed vs self-hosted databases
- HTTPS and domain setup basics
- Health check endpoints for monitoring

**Resources:**

- Railway Deployment → https://docs.railway.com/
- Render Deployment → https://docs.render.com/deploy-fastapi
- Fly.io with Docker → https://fly.io/docs/languages-and-frameworks/python/

**Exercise:**

1. Choose a platform (Railway or Render are the simplest). Sign up for a free account.
2. Add a managed PostgreSQL database to your deployment.
3. Set all environment variables in the platform's dashboard (DATABASE_URL, SECRET_KEY, etc.).
4. Deploy your Dockerized app. Verify it works by hitting the `/health` and `/docs` endpoints on the live URL.
5. Run your Alembic migrations against the production database.
6. Share the live URL — your API is now on the internet.

---

### Day 29–30: Capstone Project — Build a Complete API

**Two-day capstone.** Build something you'd be proud to show in a portfolio or to an interviewer.

**Option A: E-Commerce API**

- Users: registration, login, profiles
- Products: CRUD (admin only), search with filters, pagination
- Shopping Cart: add/remove items, calculate total
- Orders: place order (from cart), order history
- Reviews: create review for a product, average rating

**Option B: Social Bookmarking API (like a simplified Pocket/Pinboard)**

- Users: registration, login
- Bookmarks: save URL with title, description, tags
- Auto-fetch page title from URL (background task using `httpx`)
- Collections: group bookmarks into named collections
- Search: full-text search across bookmarks
- Public/private bookmarks with shareable links

**Option C: Project Management API (like a simplified Trello/Linear)**

- Users: registration, login, roles (admin, member)
- Workspaces: create workspace, invite members
- Boards: create boards within a workspace
- Tasks: CRUD with status (todo, in-progress, done), assignee, due date, priority
- Comments on tasks
- Activity log: track all changes to tasks

**Every capstone must include:**

- JWT authentication with role-based access control
- PostgreSQL with Alembic migrations
- Redis caching on at least one endpoint
- Docker + Docker Compose
- Test suite with 20+ tests and 80%+ coverage
- GitHub Actions CI pipeline
- Deployed to the cloud with a live URL
- Complete API documentation (Swagger)
- A polished README with: project description, tech stack, setup instructions, API docs link, architecture decisions

**Push to GitHub. Add it to your portfolio.**

---

## Post-30-Day Learning Path

Once you've completed this curriculum, here's what to explore next (in rough priority order):

1. **WebSockets** — real-time communication (FastAPI supports it natively)
2. **Message Queues** — Celery + Redis/RabbitMQ for heavy background processing
3. **GraphQL** — Strawberry library with FastAPI
4. **Monitoring & Observability** — Prometheus, Grafana, Sentry for error tracking
5. **System Design** — read "Designing Data-Intensive Applications" by Martin Kleppmann
6. **Microservices** — breaking a monolith into services, inter-service communication
7. **Kubernetes** — container orchestration at scale
8. **Advanced PostgreSQL** — window functions, CTEs, full-text search, JSONB queries

---

## Key Resource Links (Bookmark These)

| Resource | URL |
|---|---|
| FastAPI Official Docs | https://fastapi.tiangolo.com/ |
| SQLAlchemy 2.0 Docs | https://docs.sqlalchemy.org/en/20/ |
| Alembic Docs | https://alembic.sqlalchemy.org/en/latest/ |
| PostgreSQL Docs | https://www.postgresql.org/docs/current/ |
| Pydantic Docs | https://docs.pydantic.dev/latest/ |
| SQLBolt (SQL Practice) | https://sqlbolt.com/ |
| Docker Docs | https://docs.docker.com/ |
| Pytest Docs | https://docs.pytest.org/en/stable/ |
| OWASP Top 10 | https://owasp.org/www-project-top-ten/ |
| 12-Factor App | https://12factor.net/ |
| Roadmap.sh Backend | https://roadmap.sh/backend |
| Roadmap.sh Python | https://roadmap.sh/python |
| Boot.dev (interactive backend courses) | https://www.boot.dev/ |
| Real Python | https://realpython.com/ |
| GitHub Actions Docs | https://docs.github.com/en/actions |

---

*Built for a Python-comfortable learner. Clock starts now. Ship code every day.*