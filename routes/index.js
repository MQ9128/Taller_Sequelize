const express = require('express')
const todosFilesRouter = require('./todos.api.files.router')
const todosApiRouter = require('./todos.api.router')
const todosRouter = require('./todos.router')

function routerTodos(app){
    const router = express.Router()

    app.use('/api/v1', router)
    router.use ('/todos/panel', todosRouter)
    router.use('/files/todos', todosFilesRouter)
    router.use('/todos', todosApiRouter)
}
module.exports = routerTodos ;