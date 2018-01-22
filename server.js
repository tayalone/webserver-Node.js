const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

//set port สำหรับ deploy
const port = process.env.PORT || 3000

//enble ให้แบ่่งส่วน template ได้
hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString()
    const log= `${now}: ${req.method} ${req.url}`
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

// ใช้ middleware ทำให้ express แสดงstatic page ได้
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: "Greeting Welcome to my page"
    })
})

app.get('/about', (req, res) => {
    // res.send('About Page')
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
})

app.get('/bad', (req, res) => {
    res.send({
        messageError : "bad request"
    })
})

app.listen(port, () => {
    console.log(`server running at ${port}`)
})