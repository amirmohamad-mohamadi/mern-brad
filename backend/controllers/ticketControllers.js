const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Ticket = require("../models/ticketModels");

// @desc Get user ticket
// @route POST /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res, next) => {
  res.status(200).json({ message: "getTickets" });
});

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res, next) => {
  res.status(201).json({ message: "createTicket" });
});

module.exports = {
  getTickets,
  createTicket,
};
