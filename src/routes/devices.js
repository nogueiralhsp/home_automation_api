var express = require('express');
const router = new express.Router();
const Device = require('../models/device')

/* GET users listing. */
router.get('/devices', function(req, res, next) {
  res.send('here is the divices router');
});

/*Create device */
router.post('/devices/new', async (req,res) => {
    console.log(req.body);
    const device = new Device({
        ...req.body
    })
    console.log(device.id);
    try {
        await device.save()
        res.status(200).send({"device":device.id})
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
    
})

module.exports = router;
