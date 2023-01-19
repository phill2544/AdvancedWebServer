const express = require('express')
const app = express()
const cors = require('cors')
app.set(express.json())
app.set(express.urlencoded({extended:true}))

const mysql = require('mysql2');


app.use(cors())
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

// update status
  app.post('/UpdateStatuss',async (req,res)=>{
    conn.query(`UPDATE iot SET status = ? WHERE id = 1 `,[req.body.status],(err,result)=>{
        if(err) throw err ;
        res.send('UPdate Success')
    })
})

//fetch status
app.get('/getLedStatus', (req,res)=>{
    conn.query('SELECT * FROM iot WHERE id = 1',(err,result)=>{
        if(err) throw err;
        res.send({
            status:true,
            msg:'success',
            ledStatus: result
        })
    })
})


app.listen(3030,()=>{
    console.log('server running . .');
})