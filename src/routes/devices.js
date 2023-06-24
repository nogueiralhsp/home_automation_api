var express = require('express');
const router = new express.Router();
const Device = require('../models/device')

/* GET devices listing. */
router.get('/devicesAll', async (req, res, next) => {
      try {
          const devices = await Device.find()
          console.log(devices);
          res.send(devices)
     } catch (e) {
          res.status(500).send()
     }

     // Used to be
     // User.find({}).then((users)=> {
     //      res.send(users)
     // }).catch((e)=>{
     //      res.status(500).send()
     // })


});

/*Create device */
router.post('/devices/new', async (req, res) => {
    console.log(req.body);
    const device = new Device({
        ...req.body
    })
    console.log(device.id);
    try {
        await device.save()
        res.status(200).send({ "device": device.id })
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }

})

module.exports = router;
