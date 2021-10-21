"use strict"
const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const schema = mongoose.Schema({
    symbol: { type: String, required:true,max:10},
    totalQuantity: { type: Number,required:true},
    userId: { type: String, required:true},
    pricePerShare: {type:Number, required:true},
    equityValue:{type: Number},
    },{
toJSON :{
    transform: (doc, ret) => {
        ret.portfolioId = ret._id;
        delete ret.__v;
        delete ret._id;
    }
},
timestamps: true}

)

schema.post('save', function(portfolio){
    console.log("Post save ", portfolio);
})

schema.index({"$**": "text"});
schema.plugin(mongoosePaginate)
module.exports = mongoose.model('portfolio',schema);