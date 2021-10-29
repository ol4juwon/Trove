"use strict";
const Card = require("./CardModel");
const Repository = require("../Repository");
class CardRepository extends Repository{
    constructor(){
        super(Card);
    }

    fetchUserCards(userId){
        return this.all({userId:userId}, {_id: -1});
    };

}

module.exports = (new CardRepository());