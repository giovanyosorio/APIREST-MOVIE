const z=require('zod');

const movieSchema=z.object({
    title:z.string({invalid_type_error:"title must be a string",
    required_error:"title is required"}),
    year:z.number().int().min(1888).max(2024),
    director:z.string(),
    duration:z.number().int().min(1).max(500),
    rate:z.number().min(0).max(10).default(0),
    poster:z.string().url(),
    genre:z.array(
      z.enum(["Action","Adventure","Animation","Biography","Comedy","Crime","Drama","Family","Fantasy","History","Horror"]),
{          invalid_type_error:"genre must be a string",
            required_error:"genre is required"}
       
    )
})

function validateMovie(object)
{
    return movieSchema.safeParse(object)
}

module.exports={validateMovie}