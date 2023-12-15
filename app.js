import express, { json } from 'express';
//import movies from './movies.json' assert { type: "json" };
import { movieRouter } from './routes/movies-route.js';
import cors from 'cors';


//import fs from "node:fs"
//const movies=JSON.parse(fs.readFileSync("./movies.json"))

const app=express();
app.use(json());
app.disable('x-powered-by');
app.use(cors())
app.use("/movies",movieRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})



