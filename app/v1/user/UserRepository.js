"use strict"

const Repository  = require("../../Repository");
const User  = require("./UserModel")
const debug  = require("debug")("app:debug")

class UserRepository extends Repository {
    constructor(){
        super(User)
    }

    async getAllUserData() {
        return User.find({});
    }

    async createUser({payload}){
        let option = {
            type: ROLE_COSTUMER,
            ...payload
        }

        return this.create(option, option);
    }
}

module.exports = (new UserRepository());