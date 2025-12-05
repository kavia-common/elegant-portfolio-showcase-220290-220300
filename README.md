# elegant-portfolio-showcase-220290-220300

Backend (Express + MongoDB via Mongoose)
- Docs: /docs (Swagger UI)
- OpenAPI JSON: /openapi.json (generated via script)
- Endpoints:
  - GET / (Health)
  - GET/PUT /about
  - GET/POST /projects, PUT/DELETE /projects/:id
  - GET/POST /experience, PUT/DELETE /experience/:id
  - GET/POST /contact

Configuration
- Copy portfolio_backend/.env.example to portfolio_backend/.env and fill values.
- Ensure MongoDB is reachable using MONGODB_URI (preferred) or MONGODB_URL (legacy) or the provided host/port/db variables.
- Database connection reference: see portfolio_database/db_connection.txt for the exact connection string used for seeding and local dev.

CORS
- CORS is enabled; set CORS_ORIGIN to your frontend URL (e.g., http://localhost:3000).

Environment
- Copy portfolio_backend/.env.example to portfolio_backend/.env and adjust values.
- Set MONGODB_URI to match the connection string in db_connection.txt (example: mongodb://appuser:dbuser123@localhost:5000/myapp?authSource=admin).
- Frontend must use REACT_APP_API_URL to point to the backend base URL (e.g., http://localhost:3001).