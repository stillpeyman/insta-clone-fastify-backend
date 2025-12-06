import Fastify from "fastify"
import { highlightsRoutes } from "./highlights.routes"

describe("GET /highlights", () => {
    it("should get all highlights and return them with a 200 status code", async () => {
        const app = Fastify()

        const allHighlights = [
            {
                id: 1,
                cover_image_url: "http://example.com/highlight1.jpg",
                title: "Summer 2024",
            },
            {
                id: 2,
                cover_image_url: "http://example.com/highlight2.jpg",
                title: "Travel",
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
                getAll: jest.fn(),
            },
            highlights: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(allHighlights),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(allHighlights)
    })
})

describe("GET /highlights/:id", () => {
    it("should get a single highlight by id and return it with a 200 status code", async () => {
        const app = Fastify()

        const highlight = {
            id: 1,
            cover_image_url: "http://example.com/highlight1.jpg",
            title: "Summer 2024",
        }

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
                getAll: jest.fn(),
            },
            highlights: {
                getById: jest.fn().mockReturnValue(highlight),
                getAll: jest.fn(),
            },
        })

        app.register(highlightsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/highlights/1",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(highlight)
    })
})
