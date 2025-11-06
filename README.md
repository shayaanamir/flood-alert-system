# Flood Alert System

A comprehensive MERN stack application designed to provide real-time flood alerts, shelter information, damage reporting, and risk assessment for communities prone to flooding. The system integrates weather data, location-based services, and administrative tools to enhance disaster preparedness and response.

## Features

- **Real-time Weather Monitoring**: Fetches and displays current weather data, rainfall forecasts, and flood risk assessments.
- **Shelter Management**: Admin panel for managing emergency shelters, including capacity, supplies, and location details.
- **Damage Reporting**: Users can report flood damage, and admins can respond and track reports.
- **Alert System**: Automated SMS alerts via Twilio for flood warnings and updates.
- **Interactive Maps**: Visualize flood hotspots, shelters, and risk areas using Leaflet maps.
- **User Authentication**: Secure login and profile management with JWT tokens.
- **Admin Dashboard**: Comprehensive dashboard for monitoring stats, managing reports, and overseeing system operations.
- **Community Reports**: View and manage community-submitted flood reports and alerts.
- **Risk Assessment**: Evaluate flood risk based on location and weather data.

## Tech Stack

### Backend
- **Node.js** with **Express.js** for server-side logic
- **MongoDB** with **Mongoose** for database management
- **JWT** for authentication
- **Twilio** for SMS alerts
- **Axios** for external API calls (weather data)
- **bcryptjs** for password hashing

### Frontend
- **React** with **Vite** for fast development and building
- **React Router** for client-side routing
- **Leaflet** and **React-Leaflet** for interactive maps
- **Axios** for API communication
- **Lucide React** for icons
- **JWT Decode** for token handling

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Twilio account for SMS alerts (optional)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

1. **Landing Page**: Access the main landing page at `/`.
2. **Login**: Users can log in at `/login`.
3. **Home Dashboard**: View weather summaries, recent alerts, and flood risk maps at `/home`.
4. **Admin Dashboard**: Admins can access the dashboard at `/admin-dashboard` for system management.
5. **Shelters**: Browse available shelters at `/shelters`.
6. **Report Damage**: Submit flood damage reports at `/report-dmg`.
7. **View Risk**: Assess flood risk for specific locations at `/view-risk`.

## API Endpoints

### Weather Data
- `GET /weather-data` - Fetch current weather and flood data

### Authentication
- `POST /login-signup/login` - User login
- `POST /login-signup/signup` - User registration

### Shelters
- `GET /shelter` - Get all shelters
- `POST /shelter` - Add a new shelter (admin)
- `PUT /shelter/:id` - Update shelter details (admin)
- `DELETE /shelter/:id` - Delete a shelter (admin)

### Alerts
- `GET /alerts` - Get all alerts
- `POST /alerts` - Create a new alert (admin)

### Damage Reports
- `GET /damage-reports` - Get all damage reports
- `POST /damage-reports` - Submit a new damage report
- `PUT /damage-reports/:id` - Update report status (admin)

### Profile
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Statistics
- `GET /stats` - Get system statistics

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact the development team.
