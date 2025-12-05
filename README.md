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
- Ensure MongoDB is reachable using MONGODB_URL or the provided host/port/db variables.

CORS
- CORS is enabled; set CORS_ORIGIN to your frontend URL (e.g., http://localhost:3000).

Environment
- Copy portfolio_backend/.env.example to portfolio_backend/.env and adjust values. Ensure MONGODB_URL points to your database.