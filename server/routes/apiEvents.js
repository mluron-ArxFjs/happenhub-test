const express = require("express");
const APIEventsController = require("../controllers/apiEventsController");
const router = express.Router();

router.post("/", async (req, res) => {
  const events = await APIEventsController.addEvents();

  if (events) {
    res.status(201).send(events);
  } else {
    res.status(500).send({ error: "Unable to retrieve and save events" });
  }
});
router.get('/', async (req, res) =>{
  try{
    await APIEventsController.Update()
    res.status(200).send('API events iteration successful')
  }catch (error){
    console.log(error)
  }
})

module.exports = router;