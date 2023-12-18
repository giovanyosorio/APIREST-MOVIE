import {createRequire} from "node:module"
const require=createRequire(import.meta.url)
const movies=require("../movies.json")
import { randomUUID } from 'node:crypto';


export class MovieModel{
    static async  getAll ({genre}){
        if(genre){
            return  movies.filter(
                (movie)=>movie.genre.some(g=>g.toLowerCase()===genre.toLowerCase()))
        }
        return movies
    }

    static async getById({id}){
        const movie=movies.find((movie)=>movie.id===id)
        if(!movie){
            return null
        }
        return movie
    }

    static async create({input}){
        const newMovie={
            id:randomUUID(),
            ...input
        }
        movies.push(newMovie)
        return newMovie
    }
    static async delete({id}){
        const movieIndex=movies.findIndex((movie)=>movie.id===id)
        if(movieIndex===-1) {return null}
        movies.splice(movieIndex,1)
        return id
    }
    static async update({id,input}){
        const movieIndex=movies.findIndex((movie)=>movie.id===id)
        if(movieIndex===-1) {return null}
        const updatedMovie={
            ...movies[movieIndex],
            ...input
        }
        movies[movieIndex]=updatedMovie
        return updatedMovie
    }
}