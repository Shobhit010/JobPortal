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

// Configure CORS with specific origins and credentials
const allowedOrigins = [
  'https://job-portal-client-psi-three.vercel.app',
  'http://localhost:5173', // For local development of your frontend
  // Add any other specific frontend origins if they exist
];

// Initialize Express
const app = express()



// Connect to Database
await connectDB()
await connectCloudinary()

// Middlewares
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Important: Include all methods your API uses
  credentials: true, // Crucial if you're sending cookies, authorization headers, or using Clerk for sessions
  optionsSuccessStatus: 204 // Recommended for preflight OPTIONS requests
}));
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
const PORT = process.env.PORT || 5000

// Sentry Configuration
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app