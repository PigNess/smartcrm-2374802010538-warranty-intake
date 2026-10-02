const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello Smart CRM'));

app.get('/db-check', (req, res) => {
  res.json({
    status: "OK",
    server_time: new Date().toISOString()
  });
});

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'));
