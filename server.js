var express = require('express')
var bodyParser = require("body-parser")
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongoose.Promise = Promise

var dburl = 'mongodb+srv://may:wBZ2D59krOSdw1qB@cluster0.wnzai.mongodb.net/new-node?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
    name: String,
    message: String,
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.get('/messages/:user', (req, res) => {
    var user = req.params.user
    Message.find({name:user}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async(req, res) => {
    try {
        var message = new Message(req.body)

        var savedMessage = message.save()
    
        var censored = await Message.findOne({message: 'badword'})
        if(censored)
            await Message.remove({_id: censored_id})
        else
            io.emit('message', req.body)
            
        res.sendStatus(200)   
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
    
    
})
    

io.on('connection', (socket) => {
    console.log("connected")
})

mongoose.connect(dburl, {useNewUrlParser: true}, (err) => {
    console.log('mongodb connection', err)
})

var server = http.listen(3000, () => {
    console.log('Server serving on', server.address().port)
})