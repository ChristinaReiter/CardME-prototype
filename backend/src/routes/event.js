const express = require("express");
const router = express.Router();
const { secured } = require("../middleware/authMW");

const EventController = require("../controllers/event");

router.route("/").get( secured, EventController.getEvents).post( secured,  EventController.setEvent)

router.route("/:id").put( secured,  EventController.updateEvent).delete( secured, EventController.deleteEvent);

module.exports = router;  