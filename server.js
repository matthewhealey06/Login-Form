const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.post('/api/register', (req, res) => {
    console.log(req.body)
    res.json({ message: 'Data received' })
})

app.listen(3000, () => {
    console.log('The Server is Running')
})