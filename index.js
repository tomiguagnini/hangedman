const express =require('express')
const app = express()
const Ahorcado = require('./ahorcado-back')
const palabras = require('./palabras.json');

let ahorcado = new Ahorcado('jabali')

console.log()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.get('/',(req,res)=> res.redirect('/ahorcado.html'))
app.get('/api/ahorcado/newGame',(req,res)=> {

    let numRandom = Math.floor(Math.random()*palabras.length)
    ahorcado = new Ahorcado(palabras[numRandom])
    res.json({
        "length": ahorcado.getLength()
    })
})
app.get('/api/ahorcado/check',(req,res)=>{
    res.json(ahorcado.letter_valid(req.query.letra))
})




app.listen(3000)


