# 🚀 HNG Stage 1 Backend: Profile Classification API

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A professional demographic classification engine built for the HNG Stage 1 Backend Task. This system fetches real-time data from three external APIs, applies classification logic, and persists results in a PostgreSQL database with full idempotency and filtering support.

---

## 🛠 Tech Stack & Architecture

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript (Strict Mode)
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon Cloud)
- **ORM**: Prisma
- **ID Standard**: UUID v7 (Time-ordered)
- **CORS**: Enabled for all origins (`*`)

---

## 📋 Features

- **Concurrent Multi-API Integration**: Parallel fetching from Genderize, Agify, and Nationalize for optimal performance.
- **Intelligent Classification**:
  - **Age Grouping**: 0–12 (child), 13–19 (teenager), 20–59 (adult), 60+ (senior).
  - **Nationality Logic**: Extracts the country with the highest probability.
- **Full Idempotency**: Automatically detects duplicate names; returns existing records instead of creating new ones.
- **Robust Filtering**: Case-insensitive query parameters for `gender`, `country_id`, and `age_group`.
- **Standardized Error Handling**: Strict adherence to the mandated JSON error formats.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `^18.0.0`
- PostgreSQL Database

### Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd hng-stage1-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root:

   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   PORT=3000
   ```

4. **Initialize Database**:

   ```bash
   npx prisma generate
   ```

5. **Build & Start**:
   ```bash
   npm run build
   npm start
   ```

---

## 🔌 API Documentation

### 1. Create Profile

`POST /api/profiles`

- **Request Body**: `{ "name": "ella" }`
- **Success (201 Created)**:

```json
{
  "status": "success",
  "data": {
    "id": "019d9396-f2e2-7cd9-a220-b411a08ca19d",
    "name": "ella",
    "gender": "female",
    "gender_probability": 0.99,
    "sample_size": 1234,
    "age": 46,
    "age_group": "adult",
    "country_id": "NG",
    "country_probability": 0.85,
    "created_at": "2026-04-01T12:00:00Z"
  }
}
```

- **Existing Profile (200 OK)**:

```json
{
  "status": "success",
  "message": "Profile already exists",
  "data": { ... }
}
```

### 2. Get All Profiles

`GET /api/profiles`

- **Query Params**: `gender`, `country_id`, `age_group` (Case-insensitive)
- **Success (200 OK)**:

```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": "id-1",
      "name": "emmanuel",
      "gender": "male",
      "age": 25,
      "age_group": "adult",
      "country_id": "NG"
    }
  ]
}
```

### 3. Get Single Profile

`GET /api/profiles/:id`

- **Success (200 OK)**: Full profile object returned in `data`.

### 4. Delete Profile

`DELETE /api/profiles/:id`

- **Success**: 204 No Content.

---

## ⚠️ Error Responses

| Status | Message                                       | Description                                 |
| :----- | :-------------------------------------------- | :------------------------------------------ |
| `400`  | `Missing or empty name`                       | Request body is empty or name is missing.   |
| `422`  | `Invalid type`                                | Name is not a string.                       |
| `404`  | `Profile not found`                           | ID does not exist in the database.          |
| `502`  | `${externalApi} returned an invalid response` | Upstream API returned null or invalid data. |

---

## 🧪 Testing with cURL

```bash
# Create Profile
curl -X POST -H "Content-Type: application/json" -d '{"name": "ella"}' http://localhost:3000/api/profiles

# Get All with Filter
curl "http://localhost:3000/api/profiles?gender=female&country_id=NG"

# Delete Profile
curl -X DELETE http://localhost:3000/api/profiles/UUID_HERE
```

---

## 🛡 License

This project is licensed under the MIT License.

Developed for the **HNG Internship Stage 1 Backend Task**.
