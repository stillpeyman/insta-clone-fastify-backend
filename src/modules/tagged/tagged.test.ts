import Fastify from "fastify"
import { taggedRoutes } from "./tagged.routes"

describe("GET /tagged/grid", () => {
    it("should return a list of posts the user was tagged in with a 200 status code", async () => {
        const app = Fastify()

        const mockTaggedPosts = [
            {
                id: 1,
                img_url: "https://example.com/image1.jpg",
                caption: "Caption 1",
                tagged_by: "Jack",
            },
            {
                id: 2,
                img_url: "https://example.com/image2.jpg",
                caption: "Caption 2",
                tagged_by: "John",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn(),
            },
            reels: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn(),
            },
            tagged_posts: {
                getAll: jest.fn().mockReturnValue(mockTaggedPosts),
            },
            highlights: {
                getById: jest.fn(),
                getAll: jest.fn(),
            },
        })

        app.register(taggedRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/tagged/grid",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(mockTaggedPosts)
    })
})
