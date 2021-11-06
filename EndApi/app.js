const { urlencoded } = require('express')
const express = require('express')
// const dbConfig = require('./util/dbConfig')
// const indexRouter = require('./router/index')
const route = require('./router/users')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
app.use(cors())

app.use(route)

app.listen('3000')