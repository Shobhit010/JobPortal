// import './config/intrument.js' // Ensure this is imported before any other code
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/db.js'
// import * as Sentry from '@sentry/node'
// import { clerkWebhooks } from './controllers/webhooks.js'; 

// // Initialize Express
// const app = express()

// // Connect to Database
// await connectDB()

// // Middlewares
// app.use(cors())
// app.use(express.json())

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the API')
// })
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
// app.post('/webhooks',clerkWebhooks)

// // Port
// const PORT = process.env.PORT || 5000

// // Sentry Configuration
// Sentry.setupExpressErrorHandler(app);

// export default app

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from '@sentry/node'
import { clerkWebhooks } from './controllers/webhooks.js'
import bodyParser from 'body-parser'

const app = express()

await connectDB()

app.use(cors())

// Apply raw body only to /webhooks for Svix to verify
app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks)

// Normal JSON for rest of the app
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to the API')
})

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!')
})

const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app)

export default app
