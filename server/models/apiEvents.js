const mongoose = require("mongoose");


const APIEventSchema = new mongoose.Schema({
      name: { 
        type: String,
        required: true, 
        trim: true
      },
      ticketMasterId: {
        type: String,
        required: true, 
        unique: true
      }, 
      startDateTime:{
        type: Date,
        required: true
      },
       endDateTime:{
        type: Date,
        required: true
      },
      onsaleOnStartDate:{
        type: Date,
        required: true
      },
      created:{
        type: Date,
        default: Date.now
      },
      iterated:{
        type: Boolean,
        default: false
      }, 
      lastIterated: {
        type: Date, 
        default: null
      },
      status: {
        type: String, 
        enum: ['upcoming', 'active', 'expired' ],
        default: 'upcoming'
      }
    })


const APIEvent = mongoose.model("APIEvent", APIEventSchema);

module.exports = APIEvent;