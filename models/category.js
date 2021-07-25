const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema ({

    kategori:{
        type: String,
        require: true
    },
    altkategori:{
        type: String,
        require: true
    }
},{timestamps:true})

const Category = mongoose.model('Category',categorySchema)

module.exports= Category