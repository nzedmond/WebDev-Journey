# HTTP Methods & Status Codes Cheat Sheet

## HTTP Methods

| Method    | Purpose                                  | Safe? | Idempotent? | Has Body? | Typical Use                              |
| --------- | ---------------------------------------- | ----- | ----------- | --------- | ---------------------------------------- |
| `GET`     | Retrieve a resource                      | Yes   | Yes         | No        | Fetch a user, list posts                 |
| `POST`    | Create a new resource (or trigger action)| No    | No          | Yes       | Submit a form, create a post             |
| `PUT`     | Replace a resource entirely              | No    | Yes         | Yes       | Overwrite a user profile                 |
| `PATCH`   | Partially update a resource              | No    | No*         | Yes       | Update just the email on a user          |
| `DELETE`  | Remove a resource                        | No    | Yes         | Optional  | Delete a post                            |
| `HEAD`    | Like GET, but only returns headers       | Yes   | Yes         | No        | Check if a resource exists / get size    |
| `OPTIONS` | Discover allowed methods / CORS preflight| Yes   | Yes         | No        | Browser CORS checks                      |

\* `PATCH` is often idempotent in practice, but not guaranteed by the spec.

- **Safe** = does not modify server state.
- **Idempotent** = sending the same request multiple times has the same effect as sending it once.

## Status Codes by Category

### 2xx — Success
| Code | Name        | When to use                                              |
| ---- | ----------- | -------------------------------------------------------- |
| 200  | OK          | Generic success (GET, PUT, PATCH, DELETE with body)      |
| 201  | Created     | Resource was created (typically after POST or PUT)       |
| 202  | Accepted    | Request accepted but not yet processed (async work)      |
| 204  | No Content  | Success but no body to return (often DELETE, PUT)        |

### 3xx — Redirection
| Code | Name              | When to use                                        |
| ---- | ----------------- | -------------------------------------------------- |
| 301  | Moved Permanently | Resource has a new permanent URL                   |
| 302  | Found             | Temporary redirect                                 |
| 304  | Not Modified      | Client's cached version is still valid             |

### 4xx — Client Errors
| Code | Name              | When to use                                        |
| ---- | ----------------- | -------------------------------------------------- |
| 400  | Bad Request       | Malformed request / invalid input                  |
| 401  | Unauthorized      | Missing or invalid authentication                  |
| 403  | Forbidden         | Authenticated but not allowed                      |
| 404  | Not Found         | Resource doesn't exist                             |
| 405  | Method Not Allowed| Method not supported on this resource              |
| 409  | Conflict          | State conflict (e.g., duplicate, version mismatch) |
| 422  | Unprocessable     | Valid syntax but semantic validation failed        |
| 429  | Too Many Requests | Rate limit exceeded                                |

### 5xx — Server Errors
| Code | Name                  | When to use                                    |
| ---- | --------------------- | ---------------------------------------------- |
| 500  | Internal Server Error | Unexpected server failure                      |
| 502  | Bad Gateway           | Upstream server returned an invalid response   |
| 503  | Service Unavailable   | Server overloaded or down for maintenance      |
| 504  | Gateway Timeout       | Upstream server did not respond in time        |

## Common Pairings

| Method   | Success         | Common Errors            |
| -------- | --------------- | ------------------------ |
| `GET`    | 200, 304        | 401, 403, 404            |
| `POST`   | 201, 200, 202   | 400, 409, 422            |
| `PUT`    | 200, 204, 201   | 400, 404, 409, 422       |
| `PATCH`  | 200, 204        | 400, 404, 422            |
| `DELETE` | 204, 200        | 401, 403, 404            |
