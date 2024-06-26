const router = require('express').Router()
const {connectClient} = require('../db/postgres')
const Todo= require('../src/models/todoModel')

//Index
router.get('/', async (req, res) => {
    //console.log('GET /api/v1/todos')
    const client = await connectClient();
    try{
        const result = await client.query('SELECT * FROM todos');
        res.render('todos/index', {todos: result.rows});
    } catch (error) {
        res.status(500).send(error.message);
    } finally{
        await client.end();
    }

});

router.post("/", async (req, res) => {
    try {
        const  {title, completed} = req.body;
        console.log(req.body)
        await Todo.create({ title: req.body.title, completed: req.body.completed =='on' ? true:false});
        res.redirect('/api/v1/todos/panel');
    } catch (error){
        res.status(500).send(error.message)
    }
    
});

// Show
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('Todo no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el todo');
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Todo.update({
            title: req.body.title,
            completed: completed === 'on'
        }, {
            where: { id: req.params.id }
        });

        if (updated) {
            res.json({ success: true });
        } else {
            res.status(404).send('Todo no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el todo');
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.destroy({
            where: { id: req.params.id }
        });

        if (deleted) {
            res.send('Todo deleted');
        } else {
            res.status(404).send('Todo no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el todo');
    }
});


module.exports = router;