import { FastifyInstance } from "fastify"

const taggedService = (fastify: FastifyInstance) => {
    return {
        getAll: async () => {
            fastify.log.info(`Getting all tagged posts`)
            const allTaggedPosts = fastify.transactions.tagged_posts.getAll()
            return allTaggedPosts
        },
    }
}

export { taggedService }
