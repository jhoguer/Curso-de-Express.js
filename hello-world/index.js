const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.send( {hello: "world"} )
})



const server = app.listen(8000, () => {
  console.log(`Server is listening in: http://localhost:${server.address().port}`);
})