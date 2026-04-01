/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust to your frontend URL in production
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Agent requests OTP from client
  socket.on('agent_request_otp', ({ orderId, message }) => {
    console.log(`Agent requesting OTP for order: ${orderId}`);
    // Broadcast or room-based emit to the specific client
    // For simplicity, we broadcast to everyone on this dev environment
    io.emit('client_receive_otp_request', { orderId, message });
  });

  // Client submits OTP back to agent
  socket.on('client_submit_otp', ({ orderId, otp }) => {
    console.log(`Client submitted OTP for order: ${orderId}`);
    io.emit('agent_receive_otp', { orderId, otp });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`OTP Bridge WebSocket server running on port ${PORT}`);
});
