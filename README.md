# FuelEU Maritime — Full-Stack Compliance Platform

A full-stack implementation of a **FuelEU Maritime compliance dashboard**, built using **Clean / Hexagonal Architecture** principles.

This project demonstrates:
- Correct FuelEU compliance calculations (Articles 20 & 21)
- Strong domain modeling
- Clear separation of concerns
- Responsible and documented AI-agent usage

---

## 🚀 Tech Stack

### Frontend
- React + TypeScript
- TailwindCSS
- Recharts
- Vite

### Backend
- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL

### Architecture
- Hexagonal (Ports & Adapters / Clean Architecture)

---

## 🧠 Architecture Overview
```
src/
├── core/
│ ├── domain/ # Pure business entities
│ ├── application/ # Use-cases (business rules)
│ └── ports/ # Interfaces (contracts)
├── adapters/
│ ├── inbound/http/ # Express controllers
│ └── outbound/postgres/ # Prisma repositories
├── infrastructure/
│ ├── db/ # Prisma client
│ └── server/ # App bootstrap
├── shared/ # Constants & utilities
```

**Key rule followed:**  
> Core logic has **zero dependency** on frameworks, databases, or UI.

---

## 📊 Functional Modules

### 1️⃣ Routes
- Fetches all routes from PostgreSQL
- Displays vessel, fuel, year, GHG intensity
- Allows setting a baseline route

### 2️⃣ Compare
- Compares all routes against FuelEU target
- Displays:
  - GHG intensity
  - % difference vs target
  - Compliance status (✅ / ❌)
- Chart + table driven by backend data

### 3️⃣ Banking (Article 20)
- Computes Compliance Balance (CB) from routes
- Formula:CB = (Target − Actual) × (FuelConsumption × 41,000 MJ)

- Positive CB → bankable
- Negative CB → deficit (banking disabled)

### 4️⃣ Pooling (Article 21)
- Pools compliance balances across ships
- Enforced rules:
  - Total CB ≥ 0
  - Deficit ships never exit worse
  - Surplus ships never go negative

---

## 🔗 Backend API Summary

### Routes
- `GET /routes`
- `POST /routes/:routeId/baseline`
- `GET /routes/comparison`

### Compliance
- `GET /compliance/cb?shipId&year`
- `GET /compliance/adjusted-cb?shipId&year`

### Banking
- `POST /banking/bank`
- `POST /banking/apply`
- `GET /banking/records`

### Pooling
- `POST /pools`

---

## 🧪 Testing

### Unit Tests
- Compliance balance calculation
- Banking rules
- Pooling redistribution logic

### Integration Tests
- `/compliance/cb`
- `/routes`
- `/pools`

Run tests:
```bash
npm run test
```
## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install
npx prisma migrate reset
npm run dev
```
### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev

