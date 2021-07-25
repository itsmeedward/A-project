const express = require('express')
const Products = require('../models/products')
const router = express.Router()


//veri çekme
router.get('/database', (req, res) => {
    Products.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('database', { prod: result })
        })
        .catch((err) => {
            console.log(err)
        })
})

// id ye göre veri çekmek

router.get('/detay/:id', (req, res) => {

    const id = req.params.id

    console.log(id)
    Products.findById(id)
        .then((result) => {

            res.render('detay', { prod: result, title: 'Detay' })
        })
        .catch((err) => {
            res.status(404).render('404', { title: '404 Sayfa Bulunamadı. ' })

        })




})

module.exports = router 