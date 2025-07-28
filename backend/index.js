const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json())

//availble routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})

connectToMongo();