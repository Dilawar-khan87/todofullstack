const express = require('express')
const app = express()
const Todo = require('./models/todoModel')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const port = 3000



// const learnMongo = new Todo({ id:  1, text: 'Learn MongoDB', completed: false });
// learnMongo.save().then(() => console.log('Todo saved!'));

app.get('/', (req, res) => {
  res.send('Todo App Home!')
})

// const todos = [
//     {
//         id: 0,
//         text: 'Todo 1',
//         completed: false
//     },
//     {
//         id: 1,
//         text: 'Todo 2',
//         completed: false
//     },
// ]

app.post('/todo', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    let newTodo = req.body
    newTodo.id = Math.floor(Math.random() * 500000)

    // todos.push(newTodo)
    // ToDo.create(newTodo)

    Todo.findOne({id: newTodo.id}, (err, todo) => {
        if(err) {
            console.log(err)
        } else {
            if(!todo) {
                let TodoToAdd = new Todo(newTodo)
                TodoToAdd.save().then(() => console.log('Todo saved!'));
                res.json({"status": "success", "message": "Todo added successfully"})
            } else {
                console.log('Todo already exists!')
                res.json({"status": "error", "message": "Todo already exists!"})
            }
        }
    })

    
})

app.put('/todo/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    let id = req.params.id
    // let todo = todos.find(todo => todo.id == id)
    Todo.findOne({id: id}).then(todo => {
        todo.completed = !todo.completed
        todo.save().then(() => console.log('Todo updated!'))
        res.json({"status": "success", "message": "Todo updated successfully"})
    })
    // res.json(todo)
})

app.delete('/todo/:id', (req, res) => { 
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    let id = req.params.id
    // let todo = todos.find(todo => todo.id == id)
    // todos.splice(todos.indexOf(todo), 1)
    Todo.findOne({id: id}).then(todo => {
        todo.remove().then(() => console.log('Todo deleted!'))
        res.json({"status": "success", "message": "Todo deleted successfully"})
    })
    // res.json(204, todo)
})

app.get('/todo/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')
    let id = req.params.id
    // let todo = todos.find(todo => todo.id == id)
    Todo.findOne({id: id}).then(todo => {
        res.json(todo)
    })
})

app.get('/todos', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')

    let allTodos = Todo.find({})
    allTodos.then(todos => {
        res.json(todos)
    })
    // res.json(ToDo.findAll())
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})