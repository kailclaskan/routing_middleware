const express = require("express");
const itemsRoutes = require("./itemsRoutes");
const { items } = require("./fakeDb");
const morgan = require("morgan")

app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/items', itemsRoutes);

module.exports = app;