const express = require('express')
const app = express()
const port = process.env.PORT || 678;

app.get('/', (req, res) => {
  res.send('Hello Developers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})