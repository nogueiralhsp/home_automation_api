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
        res.status(400).send('status not saved')
    }
})

// reading value from device
router.get('/device/:id',async(req, res) => {
    const _id = req.params.id
    console.log(req.params);
    try {
        const status = await DeviceStatus.findOne({device:_id}).sort({_id:-1});
        if (!status) {
            return res.status(404).send('Not Found')
        }
        res.send(status)
    } catch (e) {
        res.status(500).send('Internal Server Error')
    }
})
module.exports = router;
