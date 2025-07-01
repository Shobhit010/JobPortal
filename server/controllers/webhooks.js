// import { Webhook } from "svix";
// import User from "../models/User.js";

// // API Controller Function to Manage Clerk User with Database

// const clerkWebhookHandler = async (req, res) => {
//     try {

//         // Create a Svix instance with clerk webhook secret.
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//         // Verfying Headers
//         await whook.verify(JSON.stringify(req.body),{
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         })

//         // Getting Data from request body
//         const { data, type } = req.body

//         // Switch Cases for different Events
//         switch (type) {
//             case 'user.created': {
                
//                 const userData = {
//                     _id: data.id,
//                     email: data.emailAddresses[0].emailAddress,
//                     name: data.firstName + " " + data.lastName,
//                     image: data.image_url,
//                     resume: '',
//                 }
//                 await User.create(userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.updated': {
//                 const userData = {
//                     email: data.emailAddresses[0].emailAddress,
//                     name: data.firstName + " " + data.lastName,
//                     image: data.image_url,
//                 }
//                 await User.findByIdAndUpdate(data.id, userData)
//                 res.json({})
//                 break;
//             }
//             case 'user.deleted': {
//                 await User.findByIdAndDelete(data.id)
//                 res.json({})
//                 break;
//             }
//             default: 
//                 break;
//         }


//     } catch (error) {
//         console.log(error.message)
//         res.json({success:false, message:'Webhooks Error'})
//     }

// }

// export const clerkWebhooks = clerkWebhookHandler

import { Webhook } from "svix"
import User from "../models/User.js"

const clerkWebhookHandler = async (req, res) => {
  try {
    const payload = req.body // this is raw Buffer

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
    const evt = wh.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    })

    const { data, type } = JSON.parse(payload.toString()) // convert buffer to string then JSON

    console.log("Received Clerk event:", type)

    switch (type) {
      case "user.created":
        const newUser = {
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: '',
        }
        await User.create(newUser)
        console.log("User created in DB:", newUser)
        break

      case "user.updated":
        const updatedUser = {
          email: data.email_addresses?.[0]?.email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
        }
        await User.findByIdAndUpdate(data.id, updatedUser)
        console.log("User updated in DB:", updatedUser)
        break

      case "user.deleted":
        await User.findByIdAndDelete(data.id)
        console.log("User deleted:", data.id)
        break

      default:
        console.log("Unhandled Clerk event:", type)
    }

    res.status(200).json({ success: true })

  } catch (err) {
    console.error("Webhook Error:", err.message)
    res.status(400).json({ success: false, message: 'Webhook error' })
  }
}

export const clerkWebhooks = clerkWebhookHandler
