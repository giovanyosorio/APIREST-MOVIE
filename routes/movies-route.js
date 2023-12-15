import {Router} from "express";
import { randomUUID } from 'node:crypto';
import {createRequire} from "node:module"
const require=createRequire(import.meta.url)
const movies=require("../movies.json")
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';


export const movieRouter = Router();

movieRouter.get('/',(req,res)=>{
     
    const {genre}=req.query
    if(genre){
    const filteredMovies=movies.filter(
            (movie)=>movie.genre.some(g=>g.toLowerCase()===genre.toLowerCase()))
        res.json(filteredMovies)   
    }
    res.json(movies)
})


movieRouter.get("/:id",(req,res)=>{
        const {id}=req.params
        const movieId=movies.find((movie)=>movie.id===id)
        if(movieId){
            res.json(movieId)
        }
        else{
            res.status(404).json({message: "movie not found"})
        } 
    })

    movieRouter.post("/",(req,res)=>{
        const result=validateMovie(req.body)
        if(result.error){
          return  res.status(400).json({error:JSON.parse(result.error.message)})
        }
        const newMovie={
            id:randomUUID(),
            ...result.data
        }
        movies.push(newMovie)
        res.status(201).json(newMovie)
       
    })


    movieRouter.patch("/:id",(req,res)=>{

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
        }
    )

    movieRouter.delete("/:id",(req,res)=>{
        const {id}=req.params
        const movieIndex=movies.findIndex((movie)=>movie.id===id)
        if(movieIndex===-1) {return res.status(404).json({message:"movie not found"})}
        movies.splice(movieIndex,1)
        res.status(204).end()
    }    )

   