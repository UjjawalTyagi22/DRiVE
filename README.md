# DRiVE: Interactive Disaster Management Platform 🛡️

DRiVE is a comprehensive, interactive disaster management education platform designed to empower individuals with the knowledge and skills needed to respond effectively to natural disasters. It features structured learning modules for earthquakes, floods, and fire safety, tailored for different learning levels.

##  Key Features

- **Interactive Modules**: Engaging lessons with progression tracking.
- **Personalized Dashboard**: Monitor your learning journey and skills acquired.
- **Multilevel Learning**: Content designed for Beginner, Intermediate, and Advanced stages.
- **Profile Management**: Maintain your training records and certifications.
- **Secure Authentication**: Robust user login and registration system.

##  Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL with Sequelize ORM.
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js.

##  Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL Server

### 1. Clone the Repository
```bash
git clone https://github.com/UjjawalTyagi22/drive-website.git
cd drive-website
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_NAME=drive_db
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```
Initialize the database:
```bash
npm start # Tables will auto-sync on first run
```

### 3. Frontend Setup
```bash
cd ..
npm install
```
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

In separate terminals:
- Backend: `cd backend && npm run dev`
- Frontend: `npm start`

## 🛡️ Security & Verification

We include a security check script to verify the integrity of the authentication system and profile protection.

To run security tests:
1. Ensure the backend is running.
2. Execute:
   ```bash
   node backend/tests/securityCheck.js
   ```

> [!NOTE]
> Database tables strictly auto-sync ONLY when `NODE_ENV` is set to `development`. In `production`, migrations should be handled manually to prevent data loss.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Developed with ❤️ by [Ujjawal Tyagi](https://github.com/UjjawalTyagi22)
