const express = require('express')
const app = express()

app.set(express.json())
app.set(express.urlencoded({extended:true}))

const mysql = require('mysql2');

const conn = mysql.createPool({
    // connectionLimit : 10,
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'iot',
});    

conn.getConnection((err)=>{
     if (err) {
        console.log('db error');
        throw err
    }else{
        console.log('db connected');
    }
})

app.put('/UpdateStatus/:status',(req,res)=>{
    status = req.params.status
    conn.query(`UPDATE iot SET status = ? WHERE id = 1 `,[status],(err,result)=>{
        if(err) throw err ;
        res.send('UPdate Success')
    })
})


app.listen(3030,()=>{
    console.log('server running . .');
})