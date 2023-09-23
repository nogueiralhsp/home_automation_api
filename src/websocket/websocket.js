const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket, request) => {
  const clientIp = request.connection.remoteAddress;
  console.log(`Client connected from IP: ${clientIp}`);

  socket.on("message", (message) => {
    console.log(`Received: ${message}`);
    // You can send a response back to the client here if needed.
  });

  socket.on("close", () => {
    console.log(`Client disconnected from IP: ${clientIp}`);
  });
});

// Function to broadcast a message to all connected clients
function broadcastMessage(message) {
  console.log(`Broadcasting: ${message}`);
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });

}
// // Example usage
// setInterval(() => {
//   broadcastMessage("This is a broadcast message from the server.");
// }, 5000); // Sends a message every 5 seconds to all connected clients


module.exports = { broadcastMessage };