const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const jwtAuth = require("./middleware/jwtAuth")
require("dotenv").config()


const authRoutes = require('./routes/auth')

const app = express()
//this will convert the request into json, since node doesn't accept json by default
app.use(express.json());

app.use('/api/auth',authRoutes)

//this should have login auth enabled
app.post('/api/auth/login', jwtAuth, authRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })