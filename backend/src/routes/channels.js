import {
  getChannelsList,
  createChannel,
  deleteChannel,
  updateChannel,
} from '../controllers/channelsController.js'

export default async function (fastify) {
  fastify.get('/api/v1/channels', { preHandler: fastify.authenticate }, getChannelsList)
  fastify.post('/api/v1/channels', { preHandler: fastify.authenticate }, createChannel)
  fastify.delete('/api/v1/channels/:id', { preHandler: fastify.authenticate }, deleteChannel)
  fastify.patch('/api/v1/channels/:id', { preHandler: fastify.authenticate }, updateChannel)
}