// GET = Listar, POST = Criar, PUT = Editar, DELETE = Deletar

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const express = require('express')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000;
const server = http.Server(app)
const io = socketio(server)

mongoose.connect('mongodb+srv://mariobarbosa:049632531@cluster0-moi0f.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {}

io.on('connection' , socket => {

    const { user_id } = socket.handshake.query
    
    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(PORT)