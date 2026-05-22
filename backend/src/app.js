import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import channelsRoutes from "./routes/channels.js";
import messagesRoutes from "./routes/messages.js";
import { setBroadcast as setChannelsBroadcast } from "./controllers/channelsController.js";
import { setBroadcast as setMessagesBroadcast } from "./controllers/messagesController.js";
import { setFastify } from "./controllers/authController.js";

const fastify = Fastify({ logger: true });

// Initialize plugins and routes
const init = async () => {
  await fastify.register(cors, { origin: true });
  await fastify.register(jwt, { secret: "my-super-secret-key" });

  // Pass fastify to auth controller AFTER jwt is registered
  setFastify(fastify);

  // Add authenticate decorator
  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: "Unauthorized" });
    }
  });

  // Register routes
  await fastify.register(authRoutes);
  await fastify.register(channelsRoutes);
  await fastify.register(messagesRoutes);
};

const start = async () => {
  try {
    await init();
    await fastify.listen({ port: 5001 });
    
    // Socket.io setup AFTER server is ready
    const io = new Server(fastify.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    // Helper to broadcast events
    const broadcast = (event, data) => {
      io.emit(event, data);
    };

    // Set broadcast function in controllers
    setChannelsBroadcast(broadcast);
    setMessagesBroadcast(broadcast);

    console.log("Server started on port 5001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
