const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Head Title
let head = 'NodeJS With MySQL';

/*
* Home route `/`.
*/
app.get('/', (req, res) => {
  let welcome = 'welcome';
  res.render('index.ejs', { 
    head: head,
    welcome: welcome 
  });
});

/*
* Todos lists `/todos/list`.
*/
app.get('/todos/list', (req, res) => {
  database.Todo.findAll()
    .then(function(todos) {
      res.render('todos-list.ejs', {
        head: head,
        todos: todos
      })
    })
    .catch(function(error) {
      res.send(error)
    })
});

/*
* Todos create `/todos/create`.
*/
app.get('/todos/create', (req, res) => {
  res.render('todos-create.ejs', {
    head: head
  });
});

app.post('/todos/create', (req, res) => {
  var name = req.body.name;

  database.Todo.create({
    name: name,
  }).then(() => {
    res.redirect('/todos/list');
  })

});

/*
* Todos delete `/todos/:id/delete`.
*/
app.delete('/todos/:id/delete/', (req, res) => {
  database.Todo.findById(req.params.id)
    .then(function(todo) {
      if(!todo) {
        res.json({
          message: 'Not Found'
        })
      }

      return todo.destroy();
    })
    .then(function() {
      res.json({
        message: 'Data Has Ben Delete!'
      })
    })
    .catch(function (error) {
       res.send(error) 
    });
});

/*
* Todos delete `/todos/update`.
*/

module.exports = app;