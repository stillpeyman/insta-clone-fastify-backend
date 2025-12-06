import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { taggedService } from "./tagged.service"

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const service = taggedService(fastify)

    fastify.get("/tagged/grid", async (request, reply) => {
        const allTaggedPosts = await service.getAll()
        return reply.status(200).send(allTaggedPosts)
    })
}

export { taggedRoutes }
