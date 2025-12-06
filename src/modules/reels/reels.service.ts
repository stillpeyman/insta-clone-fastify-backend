import type { FastifyInstance } from "fastify"
import { CreateReelDto } from "./reels.types"

const reelsService = (fastify: FastifyInstance) => {
    return {
        create: async (reelData: CreateReelDto) => {
            fastify.log.info(`Creating a new reel`)
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const reel = fastify.transactions.reels.create(reelData)
            return reel
        },
        getAll: async () => {
            fastify.log.info(`Getting all reels`)
            const allReels = fastify.transactions.reels.getAll()
            return allReels
        },
    }
}

export { reelsService }
