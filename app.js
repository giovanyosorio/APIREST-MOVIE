const express=require('express');
const movies=require('./movies.json');
const crypto=require('crypto');
const app=express();
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
    const{title,year,director,duration,genre,rate,poster}=req.body
    
    const newMovie={
        id:crypto.randomUUID(),
        title,
        year,
        director,
        duration,
        genre,
        rate,
        poster
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})


app.listen(3000,()=>{
    console.log(`Server is running on port http://localhost:3000`);
}
);


