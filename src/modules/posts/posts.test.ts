// Jest calls describe() creates container for multiple tests
// -> executes arrow func (callback #1)
// -> inside it Jest registers it() -> executes arrow func (callback #2)
// NOTE: it() is smallest unit of test, verifying ONE specific behavior or scenario
// -> -> it() is alias of test() -> why called it()? Because literally reads "it"
// Best Practice Rule:
// describe = endpoint/feature/module (like FastAPI router)
// it = single behavior/scenario (like one test function)
// Example:
// describe("POST /posts")  → groups tests for ONE HTTP method/endpoint
// it("should create...") → ONE specific test case
// describe("GET /posts")   → groups tests for ONE HTTP method/endpoint
// it("should get...")   → ONE specific test case

import Fastify from "fastify"
import { postsRoutes } from "./posts.routes"

describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = Fastify()

        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        }

        const createdPost = { ...newPostPayload, id: 1 }

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        })

        app.register(postsRoutes)

        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        })

        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.payload)).toEqual(createdPost)
    })
})

describe("GET /posts", () => {
    it("should get all posts and return them with a 200 status code", async () => {
        const app = Fastify()

        const allPosts = [
            {
                id: 1,
                img_url: "http://example.com/image.jpg",
                caption: "Test!",
            },
        ]

        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn().mockReturnValue(allPosts),
                create: jest.fn(),
            },
        })

        app.register(postsRoutes)

        const response = await app.inject({
            method: "GET",
            url: "/posts",
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(allPosts)
    })
})
