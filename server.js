import { DatabasePostgres } from './database-postgres.js'

import {fastify} from 'fastify'

const server = fastify()

const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body
    await database.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (request, reply) => {
    const search = request.params.search
    const videos = await database.list(search)
    return reply.send(videos)
})

server.put('/videos/:id', async (request, reply) => {
    const {title, description, duration} = request.body
    const videoId = request.params.id

    await database.update(videoId, {
        title, 
        description, 
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333
})