import express from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking.js"; // Capital B here!

const router = express.Router();

// 1️⃣ Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
});

// 2️⃣ Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;
    if (!name || !email || !event) {
      return res.status(400).json({ message: "Name, Email, and Event are required." });
    }
    const newBooking = new Booking({ name, email, event, ticketType });
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
});

// 3️⃣ Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Error fetching booking", error: err.message });
  }
});

// 4️⃣ Update booking
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const updates = (({ name, email, event, ticketType }) => ({ name, email, event, ticketType }))(req.body);
    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: "Error updating booking", error: err.message });
  }
});

// 5️⃣ Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully", booking: deletedBooking });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
});

export default router;

