const express=require('express');
const movies=require('./movies.json');
const crypto=require('crypto');
const app=express();
const {validateMovie,validatePartialMovie}=require('./schemas/movies.js')


app.use(express.json());
app.disable('x-powered-by');

app.get('/movies',(req,res)=>{
    const {genre}=req.query
    if(genre){
    const filteredMovies=movies.filter(
            (movie)=>movie.genre.some(g=>g.toLowerCase()===genre.toLowerCase()))
        res.json(filteredMovies)   
    }
    res.json(movies)
});

// todos los recursos que sean MOVIES se identifican con /movies

//recuperar una pelicula por su id
app.get("/movies/:id",(req,res)=>{
    const {id}=req.params
    const movieId=movies.find((movie)=>movie.id===id)
    if(movieId){
        res.json(movieId)
    }
    else{
        res.status(404).json({message: "movie not found"})
    } 
})
// crear una pelicula
app.post("/movies",(req,res)=>{

    const result=validateMovie(req.body)
    if(result.error){
      return  res.status(400).json({error:JSON.parse(result.error.message)})
    }
    const newMovie={
        id:crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
   
})

app.patch("/movies/:id",(req,res)=>{
    
    const result=validatePartialMovie(req.body)

    if(!result.success){
        return res.status(400).json({error:JSON.parse(result.error.message)})
    }
    const {id}=req.params
    const movieIndex=movies.findIndex((movie)=>movie.id===id)

    if(movieIndex===-1) {return res.status(404).json({message:"movie not found"})}

    const updatedMovie={
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex]=updatedMovie
    return res.json(updatedMovie)
})
app.listen(3000,()=>{
    console.log(`Server is running on port http://localhost:3000`);
});



