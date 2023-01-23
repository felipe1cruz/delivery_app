const express = require('express');
const loginRouter = require('../routes/loginRouter');
const customerProducts = require('../routes/customerProductsRouter');
const errorMiddleware = require('../middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(customerProducts);
app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
