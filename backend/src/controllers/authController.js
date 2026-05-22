import { getUserByUsername, createUser } from '../models/index.js'

// Global fastify instance reference
let fastifyInstance = null

export const setFastify = (fastify) => {
  fastifyInstance = fastify
}

export const signUp = async (request, reply) => {
  const { username, password } = request.body

  const existingUser = getUserByUsername(username)
  if (existingUser) {
    return reply.code(409).send({ message: 'User already exists' })
  }

  const user = createUser(username, password)
  const token = fastifyInstance.jwt.sign({ userId: user.id, username: user.username })

  return { token, username: user.username }
}

export const login = async (request, reply) => {
  const { username, password } = request.body

  const user = getUserByUsername(username)
  if (!user || user.password !== password) {
    return reply.code(401).send({ message: 'Invalid credentials' })
  }

  const token = fastifyInstance.jwt.sign({ userId: user.id, username: user.username })

  return { token, username: user.username }
}