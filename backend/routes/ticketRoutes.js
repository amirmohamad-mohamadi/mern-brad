const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTickets,
  createTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
