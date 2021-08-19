const mongoose = require('mongoose')

const deviceStatusSchema = new mongoose.Schema({
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Device'
    },
    statusValue: {
        type: String,
        required: true,
        trim: true
    },
    statusType:{
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

deviceStatusSchema.pre('save', async function (next) {
    const deviceStatus = this

    //console.log(chalk.red.bold('here on deviceSchema.pre(save)'))
    next()
})

//Creating Device Model
const DeviceStatus = mongoose.model('Device Status', deviceStatusSchema)


module.exports = DeviceStatus