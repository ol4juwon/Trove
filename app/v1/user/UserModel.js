"use strict"
const mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const schema = mongoose.Schema({
    firstName: { type: String, required:true,min: 3,max:255},
    lastName: { type: String, required:true,min: 3,max:255},
    email: { type: String,required:true},
    password: { type: String, required:true,min: 8,max:64},
    phone: {type:String, required:true},
    date_added:{type: Date, default:Date.now},
    address: {type: String, required:true},
    userType: {type :Number, required:true},
    token: {type:String},
    wallet: {type: Number, default: 0}
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.userId = ret._id;
            delete ret.password;
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true
});

schema.post('save', function(user){
    console.log("Post save ", user);
})

schema.index({"$**": "text"});
schema.plugin(mongoosePaginate)
module.exports = mongoose.model('users',schema);