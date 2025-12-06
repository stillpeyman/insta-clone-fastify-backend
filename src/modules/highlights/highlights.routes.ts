import type { FastifyInstance, FastifyPluginAsync } from "fastify"
import { highlightsService } from "./highlights.service"

const highlightsRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance
) => {
    const service = highlightsService(fastify)

    fastify.get("/highlights", async (request, reply) => {
        const allHighlights = await service.getAll()
        return reply.code(200).send(allHighlights)
    })

    fastify.get<{ Params: { id: string } }>(
        "/highlights/:id",
        async (request, reply) => {
            const id = parseInt(request.params.id, 10)
            const highlight = await service.getById(id)
            return reply.code(200).send(highlight)
        }
    )
}

export { highlightsRoutes }
