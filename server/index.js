require('dotenv').config()
const express = require('express');
const router = require('./router')
const mongoose = require('mongoose')
var cors = require('cors')

const PORT = 3001;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const app = express();
app.use(cors())
app.use(express.json())
app.use(router);


app.listen(PORT, () => {
  console.log(`Server is running at port http://localhost:${PORT} 🚀`)
})