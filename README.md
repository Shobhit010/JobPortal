# JobFinder 🚀

**JobFinder** is a full-stack job portal web application that connects job seekers and recruiters in a seamless, responsive, and modern interface. The platform allows recruiters to post jobs, manage applications, and review candidates, while job seekers can explore job listings, apply for jobs, and track their applications—all from a clean, intuitive UI.

## 🌐 Live Demo

[Coming Soon] – Deployed via **Vercel**


## 📁 Project Structure

`
JobFinder/
├── client/ # Frontend (React + Vite)
└── server/ # Backend (Node.js + Express + MongoDB)
`

## 🔧 Tech Stack

### Frontend – `client/`
- React.js (with Vite)
- React Context API
- Axios for API calls
- Tailwind CSS (assumed styling)
- Vercel deployment

### Backend – `server/`
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary (for media uploads)
- Multer (for handling file uploads)
- JWT Authentication
- Vercel serverless backend deployment

---

## ✨ Features

### 👤 For Job Seekers
- Browse jobs on the homepage
- View job details and descriptions
- Apply to jobs with uploaded resume/details
- View submitted applications

### 🧑‍💼 For Recruiters
- Login system for recruiters
- Add new job listings
- View and manage applications for posted jobs
- Dashboard for managing and editing job posts

---

## 📂 Folder Overview

### `/client`
- `src/components/` – Reusable UI components like Navbar, Footer, JobCard, etc.
- `src/pages/` – Page components like Home, Dashboard, AddJob, ApplyJob, etc.
- `src/context/` – Global state/context provider
- `public/` – Static files
- `.env` – Frontend environment variables
- `vite.config.js` – Vite configuration for dev/build

### `/server`
- `config/` – DB connection, Cloudinary setup, Multer middleware
- `controllers/` – Core logic for users, jobs, companies, and webhooks
- `middlewares/` – Authentication middleware
- `models/` – Mongoose models: User, Job, Company, JobApplication
- `routes/` – [Assumed] Express routers (define routes here)
- `utils/` – [Assumed] Custom utility functions
- `server.js` – Entry point to the Express server
- `.env` – Backend environment variables

---

## ⚙️ Installation

### 1. Clone the repository

- git clone https://github.com/Shobhit010/JobPortal.git
- cd JobPortal

### 2. Setup Frontend

- cd client
- npm install
- npm run dev

### 3. Setup Backend

- cd ../server
- npm install
- npm run dev
- Make sure MongoDB and other .env credentials are properly configured.

## 🧪 Environment Variables
### Frontend (client/.env)

- VITE_API_BASE_URL=http://localhost:5000/api

### Backend (server/.env)

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## 🚀 Deployment
### Both frontend and backend are configured for Vercel deployment:

- vercel.json files are present in both client/ and server/ directories.

- Backend is serverless-ready for API hosting via Vercel Functions.

## 📸 Screenshots
- Coming soon...

## 🙌 Credits
- Developed by Shobhit Poddar
- Built with ❤️ using MERN Stack + Vercel

## 📄 License
- This project is licensed under the MIT License.
