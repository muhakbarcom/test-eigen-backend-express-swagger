const express = require('express');

const app = express();
const port = 3000;

// express.json() untuk membaca request body yang dikirimkan oleh client
app.use(express.json());

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('./swagger');
const swaggerSpec = swaggerJsdoc(options); // Inisialisasi dokumentasi

// Import router utama
const apiRouter = require('../src/routes');

// Gunakan router utama dengan prefix /v1
app.use('/v1', apiRouter);

// app.get('/', (req, res) => {
//   res.send('Online!');
// });
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
