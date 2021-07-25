
const functions = require('firebase-functions')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const productsRoutes = require('./routes/productsRoutes')
const User = require('./models/users')
const Products = require('./models/products')
const Category = require('./models/category')
const app = express()
const port = process.env.PORT || 5005
const dbURL = 'mongodb+srv://anil2:asd123@cluster0.1cotg.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then((result) => console.log('database bağlantısı başarılı'), app.listen(port))
    .catch((err) => console.log(err))


app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'))


app.get('/', (req, res) => {
    Products.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {title: 'Anasayfa' , prod: result })
        })
        .catch((err) => {
            console.log(err)
        })
})


app.get('/adminpanel',(req,res)=>{
    res.render('adminpanel')
})


//edit START



app.get('/admin/edit/', (req, res) => {

    const id = req.params.id

    console.log(id)
    Products.findById(id)
        .then((result) => {

            res.render('edit', { prod: result, title: 'Detay' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: '404 Sayfa Bulunamadı. ' })

        })




})

//about
app.get('/about',(req,res)=>{
    res.render('about')
})
//product



app.get('/products', (req, res) => {
    Products.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('products', { prod: result })
        })
        .catch((err) => {
            console.log(err)
        })
})


//product detail page


app.get('/productdetail',(req,res)=>{
    res.render('productdetail')
})


app.get('/product/:id', (req, res) => {

    const id = req.params.id

    console.log(id)
    Products.findById(id)
        .then((result) => {

            res.render('productdetail', { prod: result, title: 'Detay' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: '404 Sayfa Bulunamadı. ' })

        })




})


//product end 


//Category add START


app.get('/admin/categoryadd',(req,res)=>{

    res.render('categoryadd',{title: 'yeni ürün'})
})


app.post('/admin/categoryadd',(req,res)=>{

    const category = new Category(req.body)
    
    category.save()
    .then((result)=>{
    
        res.redirect('/admin')
    })
    .catch((err)=>{
        console.log(err)
    })
    
    })

//Veri çekme
app.get('/admin/add', (req, res) => {
    Category.find().sort({ createdAt: -1 })
        .then((result) => {
           res.render( 'add',{ cat: result }) 
        })
        .catch((err) => {
            console.log(err)
        })
})




//Category add END

//Admin Panel START

app.get('/forms',(req,res)=>{

    res.render('forms')
})

//Admin Panel END

//veri çekme
app.get('/database', (req, res) => {
    
     
    res.redirect('database')
})

// id ye göre veri çekmek



app.get('/login',(req,res)=>{

    res.render('login')
})



app.use(productsRoutes)


app.use(adminRoutes)



//login & Sign up START 

app.get('/login',(req,res)=>{
res.render('/login')

})

app.post('/login',(req,res)=>{


})

app.get('/SignUp',(req,res)=>{
res.render('SignUp')

})
app.get('/SignUp',(req,res)=>{
    res.render('SignUp')
    
    })

app.post('/SignUp',(req,res)=>{

    const user  = new User (req.body)

    user.save()
    .then((result)=>{
        res.render('login')
    })
    .catch((err)=>{
        console.log(err)
    })

console.log(user)

})

app.post('/logout',(req,res)=>{


})




//Login  & Sign up End

//------- HATA BÖLÜMÜ----

//404

app.use((req, res) => {

    res.status(404).render('404', { title: '404 Sayfa Bulunamadı. ' })
})