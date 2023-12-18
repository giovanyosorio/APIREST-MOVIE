
import {createClient} from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto';

const supabaseUrl = 'https://nogelccrnkucgywiffhe.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZ2VsY2Nybmt1Y2d5d2lmZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MjAwOTAsImV4cCI6MjAxODQ5NjA5MH0.a-1ituuQt-ti5pZRQXT1WJSBLp294EntG8UgfVn36-Y"
const supabase = createClient(supabaseUrl, supabaseKey)



export class MovieModel {
    static async getAll({genre}){
        const {data, error} = await supabase
        .from('movie')
        .select()
    console.log(data)
    return data
    }
    static async getById({ id }) {
        try {
            const { data, error } = await supabase
                .from('movie')
                .select()
                .eq('id', id); // Use .eq for equality check
    
            if (error) {
                console.error('Error fetching data:', error);
                return { error }; // Handle and return the error
            }
    
            return data;
        } catch (e) {
            console.error('Unexpected error in getById:', e);
            return { error: e };
        }
    }
    

    static async create({input}){
        const {error} = await supabase
        .from('movie')
        .insert({
            id:randomUUID(),
            ...input
        })
    if (error) {
        console.error('Error inserting data:', error);
    }
   // console.log(input)
    return input
    
    }

    static async delete({id}){
        try {
            const {data,error}=await supabase
            .from('movie')
            .delete()
            .match({id})
            if(error){
                console.error('Error deleting data:', error);
                return { error }; // Handle and return the error
            }
            return data
        } catch (error) {
            console.error('Unexpected error in getById:', error);
            return { error: e };
        }
    }


    static async update({ id, input }) {
        try {
            const { data, error } = await supabase
                .from('products')
                .update({
                    ...input
                })
                .eq('id', id);
    
            if (error) {
                console.error('Error updating data:', error);
                return { error }; // Return the error for further handling
            }
    
            return data; // Return the updated data (or some success indicator)
        } catch (e) {
            console.error('Unexpected error in update:', e, { id, input });
            return { error: e };
        }
    }
    
}