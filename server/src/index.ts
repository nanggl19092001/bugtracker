require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const { engine } = require('express-handlebars')
const DBConnection = require('../database')

const classUser = require('./middleware/user')
const routes = require('./routes/index.route')

const PORT = 5000 || process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '../views'))

app.use('/public', express.static(path.join(__dirname, '../public')))

routes(app)

app.listen(PORT, () => {
    console.warn("SERVER UP PORT " + PORT)
})
