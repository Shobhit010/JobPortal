import './config/intrument.js' // Ensure this is imported before any other code
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from '@sentry/node'
import { clerkWebhooks } from './controllers/webhooks.js'; 
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'

const allowedOrigins = [
  'https://job-portal-client-psi-three.vercel.app',
  'https://job-portal-client-git-main-shobhits-teams-projects.vercel.app',\
  'https://job-portal-client-6i3fyu57l-shobhits-teams-projects.vercel.app',
  'https://job-portal-client-8uz1x1x1e-shobhits-teams-projects.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

// Initialize Express
const app = express()

// Connect to Database
await connectDB()
await connectCloudinary()

// Middlewares
// app.use(cors())

app.use(cors(corsOptions))
// app.options('*', cors(corsOptions))
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API')
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Port
// const PORT = process.env.PORT || 5000

// Sentry Configuration
Sentry.setupExpressErrorHandler(app);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

export default app