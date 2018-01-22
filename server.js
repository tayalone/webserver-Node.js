const express = require('express')
const hbs = require('hbs')

const app = express()

//enble ให้แบ่่งส่วน template ได้
hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine', 'hbs')
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

app.listen(3000, () => {
    console.log('server running at 3000')
})