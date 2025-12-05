# Database Seeding and Container Integration

This project uses MongoDB for persistence. Follow the steps below to seed data and ensure all containers are correctly integrated.

## 1) Database connection reference

The authoritative connection string is stored in:
- portfolio_database/db_connection.txt

That file typically contains a command like:
- mongosh <connection-string>

Example connection string (from db_connection.txt):
- mongodb://appuser:dbuser123@localhost:5000/myapp?authSource=admin

Always copy this value into the backend environment as `MONGODB_URI`.

## 2) Backend environment

Create portfolio_backend/.env (copy .env.example if available) and set:

- MONGODB_URI=<paste from db_connection.txt>
- CORS_ORIGIN=http://localhost:3000

Notes:
- MONGODB_URI is preferred and supersedes MONGODB_URL (legacy).
- CORS_ORIGIN should include your frontend origin; multiple origins can be comma-separated.

## 3) Frontend environment

In the React frontend (.env):

- REACT_APP_API_URL=http://localhost:3001

This should point to the backend base URL where the API is served.

## 4) Seeding data with mongosh

Use the connection string from db_connection.txt. Each command should be run individually:

Example (run one at a time):
- mongosh "<MONGODB_URI>"
  Then inside the shell, execute:
  - db.projects.insertOne({ title: "Sample Project", description: "Demo", techStack: ["node","react"], featured: true, order: 1 });
  - db.experiences.insertOne({ company: "Acme", role: "Engineer", startDate: new Date("2021-01-01") });
  - db.about.updateOne({}, { $set: { name: "John Doe", role: "Developer", summary: "About me" } }, { upsert: true });
  - db.contacts.insertOne({ name: "Test User", email: "test@example.com", message: "Hello!" });

MongoDB container rules:
- Always read the connection from db_connection.txt.
- Use mongosh syntax; do not create .js or .json files for operations.

## 5) Verify integration

- Backend docs: http://localhost:3001/docs
- OpenAPI JSON: http://localhost:3001/openapi.json
- Health: GET http://localhost:3001/

If CORS issues occur, verify CORS_ORIGIN in backend .env matches the frontend URL.
