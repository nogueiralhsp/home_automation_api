var express = require('express');
const router = new express.Router();
const DeviceStatus = require('../models/device_status')

/*Create device status value */
router.post('/device/status', async (req,res) => {
    console.log(req.body);
    const device = new DeviceStatus({
        ...req.body
    })
    try {
        await device.save()
        res.status(200).send('status saved')
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
})

module.exports = router;
