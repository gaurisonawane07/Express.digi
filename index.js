import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let data = []
let nextId = 1

//add a new tea

app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newData = {id:nextId++, name, price}
    data.push(newData)
    res.status(201).send(newData)
})

//get all tea
app.get('/teas', (req,res) => {
    res.status(200).send(data)
})
//get a tea with id
app.get('/teas/:id',(req,res) => {
    const tea = data.find(t => t.id === parseInt(req.params.id))
    if(!tea) {
        return res.status(404).send('tea nor found')
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id',(req,res)=>{
    const tea = data.find(t => t.id === parseInt(req.params.id))
    if(!tea) {
        return res.status(404).send('tea nor found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)

})
app.delete('/teas/:id',(req,res) => {
    const index = data.findIndex(t=>t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('tea not found')
    }
    data.splice(index, 1)
    return res.sendStatus(204)
})

app.listen(port,()=>{
    console.log(`server is running on port:${port}...`);
})