const mongoose = require('mongoose')


//creating device Schema
const deviceSchema = new mongoose.Schema({
    device: { //name of device to be created
        type: String,
        required: true,
        trim: true
    },
    description: {// what the device will be used for
        type: String,
        required: true,
        trim: true
    },
    type: {// to be analog or digital
        type: String,
        trim: true,
        default: 'breakdown'
    }
}, {
    timestamps: true
})

deviceSchema.pre('save', async function (next) {
    const device = this

    //console.log(chalk.red.bold('here on deviceSchema.pre(save)'))
    next()
})

//Creating Device Model
const Device = mongoose.model('Device', deviceSchema)


module.exports = Device