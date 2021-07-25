const express = require('express')
const Products = require('../models/products')
const router = express.Router()



//admin
router.get('/admin', (req, res) => {
    Products.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('admin', { prod: result })
    })
    .catch((err) => {
        console.log(err)
    })
})





//product delete
router.delete('/admin/delete/:id',(req,res)=>{

    const id = req.params.id

    Products.findByIdAndDelete(id)
    .then((result)=>{
res.json({link:'/admin'})

    })
.catch((err)=>{

    console.log(err)
})


})



//Product  add

router.get('/admin/add',(req,res)=>{

    res.render('add',{title: 'yeni ürün'})
})





//Product add 2. işlem

router.post('/admin/add',(req,res)=>{

    const prods = new Products(req.body)
    
    prods.save()
    .then((result)=>{
    
        res.redirect('/admin')
    })
    .catch((err)=>{
        console.log(err)
    })
    
    })

    module.exports = router