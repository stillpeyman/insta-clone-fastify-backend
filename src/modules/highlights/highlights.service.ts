import type { FastifyInstance } from "fastify"

const highlightsService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Getting all highlights`)
            const allHighlights = fastify.transactions.highlights.getAll()
            return allHighlights
        },
        getById: async (id: number) => {
            fastify.log.info(`Getting highlight with id: ${id}`)
            const highlight = fastify.transactions.highlights.getById(id)
            return highlight
        },
    }
}

export { highlightsService }
