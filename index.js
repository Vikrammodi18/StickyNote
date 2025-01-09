const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
var methodOverride = require('method-override')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')

publicPath = path.join(__dirname,'/public')
NoteDataPath = path.join(__dirname,'Stickey Note Data')


app.get('/note',(req,res)=>{
    fs.readdir(`${NoteDataPath}`,(err,file)=>{
        
        if(err) console.log(err)
        else res.render("index",{file})
    })
})
app.post('/note',(req,res)=>{
    const{tittle,content} = req.body;
    const data = {
        tittle,
        content
    }
    data.tittle = tittle.replace(/\s+/g, '')
    
    fs.writeFile(`${NoteDataPath}/${data.tittle}.txt`,data.content, (err)=>{
        if (err) console.error(err);
        else res.redirect('/note')
    })
})
app.get('/note/:tittle',(req,res)=>{
    const{tittle} = req.params
    fs.readFile(`${NoteDataPath}/${tittle}`,"utf-8",(err,text)=>{
        if(err) console.log(err);
        else res.render("view",{tittle,text})
    })
    
})
app.get('/note/:tittle/new',(req,res)=>{
    const{tittle} = req.params
    fs.readFile(`${NoteDataPath}/${tittle}`,"utf-8",(err,text)=>{
        if(err) console.log(err);
        else res.render("new",{tittle,text})
    })
    
})
app.patch('/note/:tittle',(req,res)=>{
    let {tittle,content} = req.body;
    fs.writeFile(`${NoteDataPath}/${tittle}`,content,(err)=>{
        if (err) console.log(err);
        else res.redirect('/note')
    })
    
})
app.delete('/note/:tittle',(req,res)=>{
    const{tittle} = req.params;
    fs.unlink(`${NoteDataPath}/${tittle}`,(err)=>{
        if(err) console.log(err);
        else res.redirect('/note')
    })
})
const port = 3000
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

