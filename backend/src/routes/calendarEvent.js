const express = require("express");
const router = express.Router();

const CalendarEventController = require("../controllers/calendarEvent");

router
  .route("/")
  .get(CalendarEventController.getCalendarEvent)
  .post(CalendarEventController.setCalendarEvent)
  .put(CalendarEventController.updateCalendarEvent)
  .delete(CalendarEventController.deleteCalendarEvent);

module.exports = router;
