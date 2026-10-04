# API reference

Base URL in development: `http://localhost:3000`

All responses are JSON. Every response includes an `X-Request-Id` header.

## Endpoints

### `GET /health`

Checks that the API process is running.

**Response `200`**

```json
{ "status": "ok" }
```

## Errors

Every error uses the same shape:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Route GET /nope not found",
    "requestId": "0bff7697-f4c6-4450-8552-56420e800875"
  }
}
```

- `code` is stable and meant for programs to read.
- `message` is meant for people.
- `details` is included only when there is extra information, such as which field failed validation.
- `requestId` matches the `X-Request-Id` header. Quote it when reporting a problem.

### Error codes

- `VALIDATION_ERROR` (400): the request data is invalid
- `INVALID_JSON` (400): the request body is not valid JSON
- `NOT_FOUND` (404): the route or resource does not exist
- `PAYLOAD_TOO_LARGE` (413): the request body is over the 100 KB limit
- `INTERNAL_ERROR` (500): an unexpected problem on our side; details are never shown to the client