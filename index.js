// 
// import express from"express";
// import http from "http";
// import {WebSocketServer} from "ws";
//  const app= express();
//  const server=http.createServer(app);
//  const wss=new WebSocketServer({server});
//  function broadcast(message,sender){
//     wss.clients.forEach((client)=>{
//         if(client.readyState===1 && client!==sender){
//             client.send(message);

//         }
//     });
//  }
//  wss.on("connection",(ws)=>{
//     console.log("New student connected");
//     ws.send("WELCOME TO THE CLASSROOM CHAT,rtpe your name:  message);
//     ws.on("message",(data)=>{
//         const text=data.toString().trim();
//         if(text.includes(":")){
//             const[user,message]=text.split(":");
//             const formatted =`${user.trim()} says:${message}`;
//             console.log(formatted);
//             ws.send(`you said:${message}`);
//             broadcast(formatted,ws);
//         }
//         else{
//             ws.send("Please send message like: Name:Your message");
//         }
       
//     });
//     ws.on("close",(=>console.log("A student left"));

//  });
//  app.get("/",(req,res))
 // // server.js
// import express from "express";
// import {connectDB} from "./config/db.js";
// const PORT = 3001;
// import {Student}   from "./models/student.js";
// const app = express();
// // Middleware
// app.use(express.json());
// // Connect to MongoDB
// connectDB();
// // Home route
// app.get("/", (req, res) => {
//   res.send("🎓 Welcome to the Student Management API");
// });

// // ----------------------
// // CRUD ROUTES
// // ----------------------

// // 🟢 CREATE student
// app.post("/students", async (req, res) => {
//   try {
//     const student = new Student(req.body);
//     await student.save();
//     res.status(201).json({ message: "Student created successfully", student });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 🔵 READ all students
// app.get("/students", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟠 READ student by ID
// app.get("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟣 UPDATE student
// app.put("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.status(200).json({ message: "Student updated successfully", student });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 🔴 DELETE student
// app.delete("/students/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ----------------------
// // Start the server
// // ----------------------

// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));




// const express = require('express');
// const app = express();
// app.use(express.json());

// const MAX = 10;
// const users = {};

// const ensure = (id) => (users[id] ??= { undo: [], redo: [] });
// const push = (s, a) => { s.push(a); if (s.length > MAX) s.shift(); };

// app.post('/action', (r, res) => {
//   const { userId, action } = r.body;
//   if (!userId || !action) return res.status(400).json({ error: 'Missing fields' });
//   const u = ensure(userId);
//   push(u.undo, action);
//   u.redo = [];
//   res.json({ msg: 'Action added', undo: u.undo });
// });

// app.post('/undo', (r, res) => {
//   const { userId } = r.body;
//   if (!userId) return res.status(400).json({ error: 'Missing userId' });
//   const u = ensure(userId);
//   if (!u.undo.length) return res.status(400).json({ error: 'Nothing to undo' });
//   const a = u.undo.pop();
//   push(u.redo, a);
//   res.json({ msg: 'Undo', undone: a, undo: u.undo });
// });

// app.post('/redo', (r, res) => {
//   const { userId } = r.body;
//   if (!userId) return res.status(400).json({ error: 'Missing userId' });
//   const u = ensure(userId);
//   if (!u.redo.length) return res.status(400).json({ error: 'Nothing to redo' });
//   const a = u.redo.pop();
//   push(u.undo, a);
//   res.json({ msg: 'Redo', redone: a, undo: u.undo });
// });

// app.get('/stacks/:id', (r, res) => res.json(ensure(r.params.id)));

// app.listen(3000, () => console.log('Running on 3000'));


// const express = require('express');
// const app = express();
// app.use(express.json());

// const events = {}; // eventId → { normal: [], vip: [] }

// const ensure = (id) => (events[id] ??= { normal: [], vip: [] });

// app.post('/enqueue', (req, res) => {
//   const { eventId, user, vip } = req.body;
//   if (!eventId || !user) return res.status(400).json({ error: 'Missing eventId or user' });
//   const q = ensure(eventId);
//   vip ? q.vip.push(user) : q.normal.push(user);
//   res.json({ message: `User ${user} added`, queue: [...q.vip, ...q.normal] });
// });

// app.post('/dequeue', (req, res) => {
//   const { eventId } = req.body;
//   if (!eventId) return res.status(400).json({ error: 'Missing eventId' });
//   const q = ensure(eventId);
//   const next = q.vip.length ? q.vip.shift() : q.normal.shift();
//   if (!next) return res.status(400).json({ error: 'Queue empty' });
//   res.json({ message: `Processed booking for ${next}` });
// });

// app.get('/peek/:eventId', (req, res) => {
//   const q = ensure(req.params.eventId);
//   const next = q.vip[0] || q.normal[0];
//   res.json({ nextUser: next || 'No one in queue' });
// });

// app.listen(3000, () => console.log('Booking Queue API running on 3000'));


// chat-server.js (ES module version)

// import express from "express";
// import http from "http";
// import { WebSocketServer } from "ws";

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocketServer({ server });

// // Broadcast helper
// function broadcast(message, sender) {
//   wss.clients.forEach((client) => {
//     if (client.readyState === 1 && client !== sender) {
//       client.send(message);
//     }
//   });
// }

// wss.on("connection", (ws) => {
//   console.log("✅ New student connected");
//   ws.send("👋 Welcome to the classroom chat! Type 'Name: Message'");

//   ws.on("message", (data) => {
//     const text = data.toString().trim();

//     if (text.includes(":")) {
//       const [user, message] = text.split(":");
//       const formatted = `${user.trim()} says:${message}`;
//       console.log(formatted);

//       ws.send(`You said:${message}`);
//       broadcast(formatted, ws);
//     } else {
//       ws.send("❌ Please send message like: Name: Your message");
//     }
//   });

//   ws.on("close", () => console.log("❌ A student left"));
// });

// app.get("/", (req, res) => res.send("Classroom chat running"));

// const PORT = 3005;
// server.listen(PORT, () => console.log(`🚀 Chat server running at ws://localhost:${PORT}`));




// npm install -g ngrok
// ngrok version

// ngrok http 3000
// wss://abcd1234.ngrok.io
// server.js
// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("🎉 Welcome to Synergia Event Booking API!");
});
app.use("/api/bookings", bookingRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
