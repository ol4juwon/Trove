'use strict';

const axios = require("axios");
const fs = require("fs");
const debug = require("debug")("app:debug");

global.createSuccessResponse = (res, data, code = 200, isPaginated = false) => {
    if (isPaginated || (data && data.docs)) {
        data.data = data.docs;
        delete data.docs;
        res.response = {data};
        return res.status(code).json(data);
    }

    res.success = {data};
    return res.status(code).json({data});
};

global.createErrorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
    res.error = {error};
    return res.status(code).json({error});
};

global.handleAxiosError = error => {
    try {
        if (error && error.response) {
            return {
                status: error.response.status,
                statusText: error.response.statusText,
                message: error.response.data.error,
                url: error.response.config.url,
                params: error.response.config.params,
                data: error.response.config.data,
                headers: error.response.headers,
                error: error.response.data,
                errorInString: JSON.stringify(error.response.data || {}),
                innerErrorText: error.response.data.error,
                innerError: JSON.stringify(error.response.data)
            }
        }
        return {
            status: 500,
            statusText: error.message || "Unknown Error",
            message: error.message || "Oops, An Error Occurred",
            stack: error.stack
        }
    } catch (ex) {
        return {
            status: 500,
            statusText: "Unknown Error",
            message: "Oops, An Error Occurred",
            error: ex.message,
            stack: ex.stack
        }
    }

};


global.convertUrlToBase64 = async (imageurl) => {
    try {
        let response = await axios.get(imageurl, {responseType: 'arraybuffer'});
        let base64image = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data).toString('base64');
        return base64image;
    } catch (e) {
        console.log("IMAGE CONVERT BASE64 ERROR ", e.message);
        return null;
    }
};



global.getTimestamp = () => {
    let d = new Date();
    d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return d.getTime();
};

global.axiosRequest = async (url, method, data = {}) => {
    try {
        let response = await axios[method](url, data);
        return response.data;
    } catch (e) {
        debug("axios error", e, e.message, data);
        logger(e.message, new Error(e).stack, {e: e, request: data});
        return null;
    }
};

