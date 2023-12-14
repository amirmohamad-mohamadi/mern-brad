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

// @desc Get user ticket
// @route Get /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Autorized");
  }

  res.status(200).json({ ticket });
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

// @desc Update user ticket
// @route Put /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Autorized");
  }

  const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ updateTicket });
});

// @desc remove user ticket
// @route Delete /api/tickets/:id
// @access Private
const removeTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Autorized");
  }

  await ticket.deleteOne();

  res.status(200).json({ success: true });
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  removeTicket,
};
