import type { Database } from "better-sqlite3"
import { CreatePostDto } from "src/modules/posts/posts.types"
import { CreateReelDto } from "src/modules/reels/reels.types"

// This factory function creates and returns our transaction helpers.
// Syntax rule: arrow function -> (const func = (arg) => { body })
// We pass this func a database connection, and it builds all SQL queries
const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        // db.prepare(...) from better-sqlite3 lib: pre-compiles SQL query to run faster and prevent SQL injection
        // ? syntax: A placeholder -> fill it in later with a value
        // POSTS statements
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"), // get all columns of the one row where id matches
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare(
            // RETURNING *: standard SQL -> After inserting the row, return entire (-> "*") row just created
            "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"
        ),
        // REELS statements
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare(
            // RETURNING *: standard SQL -> After inserting the row, return entire (-> "*") row just created
            "INSERT INTO reels (video_url, caption) VALUES (@video_url, @caption) RETURNING *"
        ),
        // TAGGED POSTS statements
        getAllTaggedPosts: db.prepare("SELECT * FROM tagged_posts"),

        // HIGHLIGHTS statements
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
    }

    const posts = {
        getById: (id: number) => {
            // .get() -> run query, stop after finding first match -> return single obj (Dict)
            return statements.getPostById.get(id)
        },
        getAll: () => {
            // .all() -> run query, return all rows -> return array of Dicts
            return statements.getAllPosts.all()
        },
        create: (data: CreatePostDto) => {
            return statements.createPost.get(data)
        },
    }

    const reels = {
        getById: (id: number) => {
            // .get() -> run query, stop after finding first match -> return single obj (Dict)
            return statements.getReelById.get(id)
        },
        getAll: () => {
            // .all() -> run query, return all rows -> return array of Dicts
            return statements.getAllReels.all()
        },
        create: (data: CreateReelDto) => {
            return statements.createReel.get(data)
        },
    }

    const tagged_posts = {
        getAll: () => {
            return statements.getAllTaggedPosts.all()
        },
    }

    const highlights = {
        getById: (id: number) => {
            return statements.getHighlightById.get(id)
        },
        getAll: () => {
            return statements.getAllHighlights.all()
        },
    }

    // => following here "Compile Once, Run Many" rule for performance and cleanliness
    // performance: compile SQL once when server starts (statements), and just run pre-compiled plan (posts)
    // cleanliness: hide complex SQL syntax so helper function looks simple and readable

    return {
        // short-hand property name: key and variable name the same so no need to write posts: posts
        posts,
        reels,
        tagged_posts,
        highlights,
    }
}

// Basically: TransactionHelpers is “the shape of the object returned by createTransactionHelpers.”
export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>
export { createTransactionHelpers }
