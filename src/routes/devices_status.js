var express = require("express");
const messageHandling = require("../raspberry_pi/message_handling");
const router = new express.Router();
const DeviceStatus = require("../models/device_status");

/*Create device status value
this is used to set status of the device, on/off or new value for analog devices */
router.post("/device/status", async (req, res) => {
  const device = new DeviceStatus({
    ...req.body,
  });
  // preparring data to be sent to the device
  const data = {
    messageType: "command",
    ...req.body,
  };
  try {
    await device.save();
    messageHandling(data);//sending message to the device
    res.status(200).send("status saved");
  } catch (e) {
    console.log(e);
    res.status(400).send("status not saved");
  }
});

// reading value from device
router.get("/device/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(req.params);
  try {
    const status = await DeviceStatus.findOne({ device: _id }).sort({
      _id: -1,
    });
    if (!status) {
      return res.status(404).send("Not Found");
    }
    res.send(status);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// reading digital devices at once
router.get("/devices/digital", async (req, res) => {
  console.log(req.params);
  try {
    const status = await DeviceStatus.find({ statusType: "digital" });
    console.log(status);
    if (!status) {
      return res.status(404).send("Not Found");
    }
    res.send(status);
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
