import express from 'express';
import { pool } from '../drizzle/db';
import cors from 'cors';

const app = express();

app.use(cors());

app.get("/", (req,res)=>{
    return res.status(200).json({
        alive:true,
        test:'dupa'
    });
})

app.get('/api/timestamp', async (req, res)=>{
    const result = await pool.query("SELECT NOW() as now")
    console.log(result)
    res.status(200).json({
        timestamp:result.rows[0].now
    })
})

app.use((req, res)=>{
    res.status(404).json({
        error: "Not Found"
    })
})

async function startServer(){
    try{
        console.log("Try to connect to db")
        await pool.query('SELECT 1');
        console.log("connection succeeded")
        app.listen(3000,()=>{
            console.log('listening on port 3000')
        })
    }catch(err){
        console.log("error")
        console.log(err)
        process.exit(1);
    }
}

await startServer();