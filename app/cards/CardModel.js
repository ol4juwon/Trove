'use strict';
var mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const cardSchema =  mongoose.Schema({
    userId:  {type: String, required: true},
    gateway: {type: String},
    cardAuth:{type: String, required:true, dropDups: true},
    bank: {type:String, required:true },
    last4:{type:String, required:true},
    cardType:{type:String, required:true},
    customer:{type:String},
    email: {type: String},
    default:{type: Boolean, required: true},
},{
    
    toJSON: { 
        transform: function(doc, ret) {
          ret.cardId = ret._id;
          delete ret.email;
          delete ret.auth;
          delete ret.customer;
          delete ret.createdAt;
          delete ret.updatedAt;
          delete ret.__v;
          delete ret._id;
        }
    },
    timestamps: true
})



cardSchema.index({ "$**": "text" });
cardSchema.plugin(mongoosePaginate);
const myModel =  mongoose.model("user_cards", cardSchema);
module.exports = myModel
