import Fastify from "fastify"
import { databasePlugin } from "./core/database/database.plugin"
import { postsRoutes } from "./modules/posts/posts.routes"
import { reelsRoutes } from "./modules/reels/reels.routes"
import { taggedRoutes } from "./modules/tagged/tagged.routes"
import { highlightsRoutes } from "./modules/highlights/highlights.routes"

const fastify = Fastify({
    logger: true,
})

// Register our database plugin
fastify.register(databasePlugin)
// Register our new posts routes
fastify.register(postsRoutes)
// Register our new reels routes
fastify.register(reelsRoutes)
// Register our new tagged routes
fastify.register(taggedRoutes)
// Register our new highlights routes
fastify.register(highlightsRoutes)

// Declare a default route, handler always called with request and reply arguments
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" })
})

const port = 3000

// Start the server, listening on the specified port, if something goes wrong, exit with an error code
// function (err, address) -> callback function because inside fastify.listen function
// You never call that function yourself; fastify.listen does
// => That’s why it’s a callback: you hand it in, Fastify calls it later when starting the server finishes
fastify.listen({ port }, function (err, address) {
    //address argument in the callback is that full URL string like "http://127.0.0.1:3000"
    if (err) {
        fastify.log.error(err)
        process.exit(1) // Exit with an error code 1 = "something went wrong"
    }
})
