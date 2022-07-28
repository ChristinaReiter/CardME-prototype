const Event = require("../models/calendarEvent");
const Account = require("../models/account");


const getEvents = async (req, res) => { 
    try {
      const events = await Event.find({ account: req.account.id });
  
      return res.status(200).json(events);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const setEvent = async (req, res) => { 
    try {
      if (!req.body.eventDate || !req.body.title) {
        return res.status(400).json({error:"Missing Values"});
      }      
      const event = await Event.create({
        eventDate: req.body.eventDate,
        title: req.body.title,
        description: req.body.description,
        account: req.account.id 

      });
  
      return res.status(200).json(event);
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

  const updateEvent = async (req, res) => { //TODO
   
     try {
      const event = await Event.findById(req.params.id); 

      if(!event) {
        return res.status(400).json({error:"Event not found"});
      }

      const account = await Account.findById(req.account.id);

      if(!account) {
        res.status(401).json({error:"Account not found"});
      }

      if(account.id !== event.account.toString()) {
        return res.status(401).json({error:"You are not allowed to edit this Event"});
      }

      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
  
      return res.status(200).json(updatedEvent);
      
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    } 
  };

  const deleteEvent = async (req, res) => { 
    try {
      const event = await Event.findById(req.params.id); 

      if(!event) {
        return res.status(400).json({error:"Event not found"});
      }

      const account = await Account.findById(req.account.id);

      if(!account) {
        res.status(401).json({error:"Account not found"});
      }

      if(account.id !== event.account.toString()) {
        return res.status(401).json({error:"You are not allowed to edit this Event"});
      } 

      await event.remove();
  
      return res.status(200).json({id: req.params.id}); 
    } catch (err) {
      console.log(err);
  
      return res.status(500).json({
        error: "Internal server errorr",
        message: err.message,
      });
    }
  };

  module.exports = {
    getEvents,
    setEvent,
    updateEvent,
    deleteEvent,
  };
  