import { z } from "zod"

const createReelDtoSchema = z.object({
    video_url: z.string().url(),
    caption: z.string().nullable().optional(),
})

const reelSchema = z.object({
    id: z.number(),
    video_url: z.string().url(),
    thumbnail_url: z.string().url(),
    caption: z.string().nullable(),
    views: z.number().min(0).optional(),
    created_at: z.string().datetime().optional(),
})

const reelsSchema = z.array(reelSchema)

type CreateReelDto = z.infer<typeof createReelDtoSchema>
type Reel = z.infer<typeof reelSchema>

export { createReelDtoSchema, reelSchema, reelsSchema, CreateReelDto, Reel }
