import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import chatRouts from "./routes/chat.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

app.use("/api/auth", authRoutes);
app.use("/api", chatRouts);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectToDB();
});

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// This (/test) route is created just to verify that the API call is working.
/* this route is acting like a mini AI chat server. The frontend sends a message → the backend forwards it to Llama 3.1 → the backend returns the AI’s reply.*/

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     // Set up headers and body for the API request
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3.1-8b-instruct",
//       messages: [
//         {
//           role: "user", // Role of the message sender
//           content: req.body.message, // Get the message from the request body
//         },
//       ],
//     }),
//   };

//   // Make the API request to OpenRouter
//   try {
//     //fetch() call to OpenRouter API and get the response and send it back to the client.
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       options
//     );

//     const data = await response.json();
//     // console.log(data.choices[0].message.content); // Log the response content
//     res.send(data.choices[0].message.content); // Send the response back to the client
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
