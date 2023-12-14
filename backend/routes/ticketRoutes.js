const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  removeTicket,
} = require("../controllers/ticketControllers");

const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, removeTicket);

module.exports = router;
