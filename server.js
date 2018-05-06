const bodyparser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

// Import Routes
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')
const users = require('./routes/api/users')

const app = express()

// Body Parser middleware
app.use(bodyparser.urlencoded({ extended: false }))

// ==============================================================
// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// ==============================================================
// Passport Middleware
app.use(passport.initialize())

// Passport  Config
require('./config/passport')(passport)

// ==============================================================
// Begin Routes


// API Routes
app.use('/api/posts', posts)
app.use('/api/profile', profile)
app.use('/api/users', users)

// Define Port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
