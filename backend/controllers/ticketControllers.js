const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const Ticket = require("../models/ticketModels");

// @desc Get user ticket
// @route POST /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("user not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json({ tickets });
});

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = Ticket.findById(req.user.id);
  if (!user) {
    throw new Error("user not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    status: "new",
    user: req.user.id,
  });
  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTicket,
};
