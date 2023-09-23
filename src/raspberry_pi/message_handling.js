const websocket = require("../websocket/websocket");

function messageHandling(message) {
    websocket.broadcastMessage(JSON.stringify(message));
}

module.exports = messageHandling;