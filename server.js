const mysql = require("mysql");

if (process.env.JAWSDB_URL !== "production") {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  let mysqlConnection = mysql.createConnection({
    host: "localhost/3000",
    user: "root",
    password: "root",
    database: "phrasenschwein",
  });
}

const PORT = process.env.PORT || 3000;

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to database");
  } else {
    console.log("Connection failed");
    console.log(err);
  }
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT", "DELETE"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

//VIEW ENGINE
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});

//get home page
app.get("/", (req, res) => {
  res.render("pages/index");
});

// Get all employees
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employees", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// Get an employee
app.get("/employees/:name", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employees WHERE name = ?",
    [req.params.name],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Add an employee
app.post("/api/employees/:name", (req, res) => {
  let sql = `INSERT INTO employees (name, balance) VALUES (${[
    req.params.name,
  ]}, 0)`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send("Inserted successfully");
    } else {
      console.log(err);
    }
  });
});

// Delete an employee
app.delete("employees/:name", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employees WHERE name = ?",
    [req.params.name],
    (err, rows, fields) => {
      if (!err) {
        res.send("Deleted successfully");
      } else {
        console.log(err);
      }
    }
  );
});

// Charge an employee
app.put("/employees/:name/charge/", (req, res) => {
  let sql = `UPDATE employees SET balance = balance - 1 WHERE name = '${[
    req.params.name,
  ]}'`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(req.params.name + " charged successfully");
    } else {
      console.log(err);
    }
  });
});

// Add money to an employee
app.put("/employees/:name/add/", (req, res) => {
  let sql = `UPDATE employees SET balance = balance + 1 WHERE name = '${[
    req.params.name,
  ]}'`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(req.params.name + " charged successfully");
    } else {
      console.log(err);
    }
  });
});

// Reset an employee's balance
app.put("/employees/:name/reset", (req, res) => {
  let sql = `UPDATE employees SET balance = 0 WHERE name = '${[
    req.params.name,
  ]}'`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(req.params.name + "'s Balance is reset successfully");
    } else {
      console.log(err);
    }
  });
});

// reset all employees' balance
app.put("/employees/reset", (req, res) => {
  let sql = `UPDATE employees SET balance = 0`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send("All employees' balance is reset successfully");
    } else {
      console.log(err);
    }
  });
});

// login
app.get("/login/:name/:password", (req, res) => {
  let sql = `SELECT * FROM employees WHERE name = '${[
    req.params.name,
  ]}' AND password = '${[req.params.password]}'`;
  mysqlConnection.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});
