
# Flood Alert System

A full-stack MERN application designed to help communities monitor, prepare for, and respond to floods in real time.  
It integrates live weather data, rainfall analytics, nearby shelter information, and community-sourced damage reports — all in one responsive dashboard.

---

## Features

- **Real-Time Weather & Rainfall Data** – Live temperature, rainfall, humidity, and wind data via Open-Meteo API.
- **Flood Risk Dashboard** – Displays dynamic flood risk levels and rainfall trends.
- **Nearby Shelters** – Automatically fetches safe shelters within a 10 km radius using geolocation.
- **Community Damage Reports** – Allows users to report and view verified flood incidents.
- **Interactive Maps** – Built with Leaflet for real-time visualization of shelters and flood-prone areas.
- **Alert Monitoring** – Displays critical, moderate, and low-level alerts on the dashboard.
- **Responsive Design** – Optimized for desktop and mobile.
- **Modular Backend** – Well-structured API routes for reports, shelters, and alerts.

---

## Tech Stack

### **Frontend**
- React + Vite
- Leaflet for interactive mapping
- Axios for API calls
- React Router for routing
- CSS / Tailwind for styling

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- Open-Meteo API (for weather and rainfall)
- JWT (optional for authentication)
- Twilio (optional for SMS alerts)

---

## Project Structure

```

flood-alert-system/
│
├── backend/
│   ├── controllers/
│   │   ├── shelterController.js
│   │   └── damageController.js
│   ├── models/
│   │   ├── Shelter.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── shelterRoutes.js
│   │   └── damageRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── Shelters.jsx
│   │   │   ├── ViewRisk.jsx
│   │   │   └── ReportDamage.jsx
│   │   ├── styles/
│   │   ├── utils/
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md

````

---

## Environment Variables

Create a `.env` file inside the **backend** directory:

```bash
MONGO_URI="mongodb+srv://floodalert:admin123@floodalert.26hahle.mongodb.net/flood-alert-db"
JWT_SECRET="your_jwt_secret"
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_PHONE_NUMBER="your_twilio_phone_number"
PORT=5000
````

---

## Installation Guide

### **Backend Setup**

```bash
cd backend
npm install
nodemon server.js
```

> Runs the Express server at **[http://localhost:5000](http://localhost:5000)**

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

> Launches the React client at **[http://localhost:5173](http://localhost:5173)**

---

## Core Functionalities

### Weather & Risk Dashboard

* Fetches live data from Open-Meteo API.
* Displays rainfall intensity, wind speed, and humidity.
* Updates automatically every 5 minutes.

### Nearby Shelters

* Fetches data from `/shelter/nearby?lat={userLat}&lon={userLon}&radius_km=10`
* Displays shelters on map and in list form.
* Supports filtering: Available, Pet-friendly, Accessible.

### Community Reports

* Users can submit and view flood-related reports.
* Schema includes:

  * Title, Description, Location, Severity, Status, and Contact Info.
* Endpoint: `/report` and `/report/:id`.

### Rainfall Trends

* Uses live rainfall data to generate SVG-based charts.
* Risk thresholds:

  * **Critical:** ≥ 50 mm/h
  * **High:** ≥ 25 mm/h
  * **Moderate:** ≥ 10 mm/h

---

## API Overview

| Method   | Endpoint                               | Description                                  |
| :------- | :------------------------------------- | :------------------------------------------- |
| **GET**  | `/shelter`                             | Fetch all shelters                           |
| **GET**  | `/shelter/nearby?lat=&lon=&radius_km=` | Get shelters within a radius (default 10 km) |
| **GET**  | `/shelter/:id`                         | Get a shelter by ID                          |
| **GET**  | `/alerts/recent`                       | Fetch latest flood alerts                    |
| **GET**  | `/alerts/stats`                        | Get alert statistics summary                 |
| **POST** | `/report`                              | Submit a new community damage report         |
| **GET**  | `/report`                              | View all community reports                   |

---


## Deployment

For local testing:

```bash
# Run backend
cd backend && nodemon server.js

# Run frontend
cd frontend && npm run dev
```
