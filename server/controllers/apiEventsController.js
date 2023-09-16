const APIEvent = require("../models/apiEvents");
const axios = require("axios");
/* Global variables*/
const TM_KEY = "m0o6ngepm1tvjHNa09clKOFNQZnWVpzK";
//const TM_SIZE = 25;
//const TM_RADIUS = 50; // in miles

const APIEventsController = {
    addEvents: async () => {
      try {
        const response = await axios.get(
          `https://app.ticketmaster.com/discovery/v2/events.json?size=25?apikey=${TM_KEY}&locale=*&size=10&city=NewYork&countryCode=US`
        );
  
        const events = response.data._embedded.events;
  
        const apievents = events.map((event) => {
          return new APIEvent({
            name: event.name,
            ticketMasterId: event.id,
            startDateTime: new Date(event.dates.start.dateTime),
            endDateTime: new Date(event.dates.end.dateTime),
            onsaleOnStartDate: new Date(event.sales.public.startDateTime),
            created: new Date(),
            iterated: false,
            lastIterated: null,
            status: "upcoming",
          });
        });
  
        await APIEvent.insertMany(apievents);
  
        return apievents;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    Update: async () => {
      try {
        const unIteratedEvents = await APIEvent.find({ iterated: false });
        
        for (const apiEvent of unIteratedEvents) {
          // mark the event as iterated
          apiEvent.iterated = true;
          apiEvent.lastIterated = new Date();
          await apiEvent.save();
          
          const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${apiEvent.ticketMasterId}?apikey=${TM_KEY}&locale=*`);
          
          const eventData = response.data;
          
      
          const newEvent = new Event({
            name: eventData.name,
            ticketmasterId: eventData.id,
            url: eventData.url,
            postCode: eventData._embedded.venues[0].postalCode,
            geoPoint: eventData._embedded.venues[0].location,
            venueId: eventData._embedded.venues[0].id,
            venueAddress: `${eventData._embedded.venues[0].address.line1}, ${eventData._embedded.venues[0].city.name}, ${eventData._embedded.venues[0].state.name}`,
            description: eventData.info || eventData.description || "",
            genre: eventData.classifications[0].genre.name,
            subgenre: eventData.classifications[0].subGenre ? eventData.classifications[0].subGenre.name : undefined,
            accessibility: eventData.accessibility ? eventData.accessibility.info : undefined,
            isFamilyFriendly: eventData.info && eventData.info.toLowerCase().includes("family") ? "yes" : "none",
            ageRestricted: eventData.ageRestrictions ? eventData.ageRestrictions[0].legalAgeEnforced : undefined,
            images: [], // will be populated later by the images collection controllers
            priceRange: eventData.priceRanges ? eventData.priceRanges.map(range => ({ min: range.min, max: range.max })) : []
          });
          
          await newEvent.save();
          
          apiEvent.eventId = newEvent._id;
          await apiEvent.save();
          
          console.log(`Event "${newEvent.name}" saved to database`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  module.exports = APIEventsController;