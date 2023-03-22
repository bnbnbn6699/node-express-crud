var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'shop'
});

var app = express()
app.use(cors())
app.use(express.json())

app.get('/market', function (req, res, next) {
    connection.query(
      'SELECT * FROM market',
      function(err, results, fields) {
        res.json(results);
      }
    );
  })

app.get('/market/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
      'SELECT * FROM market WHERE id = ?',
      [id],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.post('/market', function (req, res, next) {
    connection.query(
      'INSERT INTO market(Name, Type, Category, Price, Pic) VALUES (?, ?, ?, ?, ?)',
      [req.body.Name, req.body.Type, req.body.Category, req.body.Price, req.body.Pic],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/market', function (req, res, next) {
    connection.query(
      'UPDATE market SET Name= ?, Type= ?, Category= ?, Price= ?, Pic= ? WHERE id = ?',
      [req.body.Name, req.body.Type, req.body.Category, req.body.Price, req.body.Pic, req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.delete('/market', function (req, res, next) {
    connection.query(
      'DELETE FROM market WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})