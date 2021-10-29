"use strict";
class CustomPaystackError extends Error{
    constructor(error){
        super();
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.message = error.response && error.response.data && error.response.data.message || error.message || 'Gateway Timeout';
        this.status = error.response && error.response.status || 504;
        logger(this.message, error,{timestamp: Date.now()});
    }
}

module.exports = CustomPaystackError;
