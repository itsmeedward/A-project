const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productsSchema = new Schema({

title:{
    type:String,
        require: true
},
short:{
    type:String,
        require: true
},
long:{
    type: String,
        require: true
},
cdn:{
    type: String
},
price:{
    type: Number,
    require: true
},
kategori:{
    type:String,
    require: true
}
},{timestamps:true})


const Products = mongoose.model('Products',productsSchema)

module.exports= Products