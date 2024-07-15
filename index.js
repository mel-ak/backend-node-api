const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

app.use(express.json());

const SensorData = sequelize.define("SensorData", {
  serial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

app.get("/data", async (req, res) => {
  const allData = await SensorData.findAll();
  res.status(200).send(allData);
  return;
});

app.post("/data", async (req, res) => {
  const data = req.body;
  const sensorData = await SensorData.create(data);
  res.status(201).send(sensorData);
  return;
});

app.listen(8080, () => {
  try {
    sequelize.authenticate();
    console.log("Connected do the database");
    sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Couldn't connect");
  }
  console.log("Server is running");
});
