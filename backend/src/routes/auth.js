import { signUp, login } from '../controllers/authController.js'

export default async function (fastify) {
  fastify.post('/api/v1/signup', signUp)
  fastify.post('/api/v1/login', login)
}