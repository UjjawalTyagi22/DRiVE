# Deployment Guide - DRiVE Website

This guide outlines the steps to deploy the DRiVE website and its backend to production.

## 1. Database Setup
Since you are currently using a local MySQL database, you will need a hosted instance for production.
- **Recommended**: [Aiven](https://aiven.io/), [PlanetScale](https://planetscale.com/), or a managed MySQL on [DigitalOcean](https://www.digitalocean.com/).
- Once set up, update your backend environment variables with the new host, user, and password.

## 2. Backend Deployment (e.g., Render or Railway)
1. **Repository**: Push your code to GitHub.
2. **Setup**: Connect the `backend/` folder to your hosting provider.
3. **Environment Variables**: Add the following in the host dashboard:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`: Generate a secure random string.
   - `FRONTEND_URL`: URL of your deployed frontend (e.g., `https://drive-safety.vercel.app`).
   - `NODE_ENV`: `production`

## 3. Frontend Deployment (e.g., Vercel)
1. **Repository**: Connect your GitHub repository.
2. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `build/`
3. **Environment Variables**:
   - `REACT_APP_API_URL`: URL of your deployed backend followed by `/api` (e.g., `https://drive-api.onrender.com/api`).

## 4. Final checklist
- [ ] Run `npm run build` locally once to check for errors.
- [ ] Ensure `CORS` in `backend/server.js` is set to the correct `FRONTEND_URL`.
- [ ] Verify that the database migrations (if any) are run on the production DB.
