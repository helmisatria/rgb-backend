const express = require('express')

const bodyParser = require('body-parser')

const app = express()

const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'helmi232',
  database : 'rgb-backend'
});


app.use(express.static('public'))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  connection.query('SELECT * FROM TODOS', (error, todos) => {
    res.render('bootstrap', {
      todos
    })
  })
})

app.post('/add_todo', (req, res) => {
  const activity = req.body.activity

  connection.query(`INSERT INTO TODOS (activity) VALUES ("${activity}")`, (err, todo) => {
    if (err) {
      return console.log('Gagal insert activity');
    }
    res.redirect('/')
  })
})

app.get('/edit_todo/:id', (req, res) => {
  
  const id = req.params.id
  
  connection.query(`SELECT * FROM TODOS WHERE id = ${id}`, (err, todo) => {
    if (err) {
      return console.log('Activity tidak ditemukan');
    }
    console.log(todo);
    
    res.render('edit', {
      todo: todo[0]
    })
  })
})

app.post('/edit_todo/:id', (req, res) => {
  
  const id = req.params.id

  const activity = req.body.activity

  connection.query(`UPDATE TODOS SET activity = "${activity}" WHERE id = ${id}`, (err, todo) => {
    if (err) {
      console.log(err);
      
    }
    res.redirect('/')
  })
  
})

app.get('/delete_todo/:id', (req, res) => {
  
  const id = req.params.id

  connection.query(`DELETE FROM TODOS WHERE id = ${id}`, (err, todo) => {
    if (err) {
      return console.log('Gagal hapus data');
    }
    res.redirect('/')
  })

})

app.listen(8080, () => {
  console.log('Connected on port 8080');
})