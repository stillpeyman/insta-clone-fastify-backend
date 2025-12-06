import { z } from "zod"

const highlightSchema = z.object({
    id: z.number(),
    cover_image_url: z.string().url(),
    title: z.string(),
    created_at: z.string(),
})

const highlightsSchema = z.array(highlightSchema)

type Highlight = z.infer<typeof highlightSchema>
type Highlights = z.infer<typeof highlightsSchema>

export { highlightSchema, highlightsSchema, Highlight, Highlights }
