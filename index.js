const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

app.use(express.json());

const dataList = [];

app.get("/data", (req, res) => {
  res.status(200).send(dataList);
  return;
});

app.post("/data", (req, res) => {
  const data = req.body;
  dataList.push(data);
  res.status(201).send("Hello");
  return;
});

app.listen(8080, () => {
  try {
    sequelize.authenticate();
    console.log("Connected do the database");
  } catch (error) {
    console.log("Couldn't connect");
  }
  console.log("Server is running");
});
