import { getMessagesList, createMessage } from '../controllers/messagesController.js'

export default async function (fastify) {
  fastify.get('/api/v1/messages', { preHandler: fastify.authenticate }, getMessagesList)
  fastify.post('/api/v1/messages', { preHandler: fastify.authenticate }, createMessage)
}