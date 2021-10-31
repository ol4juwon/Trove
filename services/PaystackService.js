const axios = require("axios");
const debug = require("debug")("app:debug");
const {nanoid} = require("nanoid")
const secKey = process.env.PAYSTACK_SECRET_KEY;
const CustomPaystackError = require("../errors/CustomPaystackError");


class PaystackService {
    constructor() {
        this._axios = axios.create({
            baseURL: "https://api.paystack.co",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${secKey}`,
                'Content-Type': 'application/json',
                'cache-control': 'no-cache'

            }
        });
        this.email = "olajuwonlawal2012@gmail.com";
    }

    async initialize(amount, redirectUrl = "http://localhost:4000/callback/", reference , email,metadata) {
        
    try {
            console.log("Email", email);
            const response = await this._axios
                .post(`/transaction/initialize`, {
                    amount: amount * 100,
                    reference ,
                    channels: ['card'],
                    email: email || this.email,
                    callback_url: redirectUrl,
                    metadata
                });
            console.log("pss", response.data);
            return response.data;
        } catch (e) {
            console.log("juwon",e.message);
            throw new CustomPaystackError(e);
        }
    }

    async verify(reference) {
        try {
            const response = await this._axios
                .get(`/transaction/verify/${reference}`);
            return {
                status: response.data.status,
                data: response.data.data
            };
        } catch (error) {
            return {
                status: false,
                error: error.response && error.response.data && error.response.data.message || error.message || 'Gateway Timeout',
            };
            // throw new CustomPaystackError(e);
        }
    }

    async charge(transactionId, chargeAuth, amount, email,metadata) {
        try {
            console.log(transactionId, chargeAuth, amount, email);
            const response = await this._axios.post(`/transaction/charge_authorization`, {
                reference: transactionId,
                authorization_code: chargeAuth,
                amount: amount * 100,
                currency: "NGN",
                email: email.trim().toString(),
                metadata: metadata
            });
            console.log("Response", JSON.stringify(response.data));
            return response.data;
        } catch (e) {
            // console.log("paystack charge error---", e.message, e.response);
            console.log(e.message, e.stack, {
                error: handleAxiosError(e),
                transactionId,
                chargeAuth,
                amount,
                email
            }, true);
            return {
                statue: false,
                message: e.message
            };
            throw new CustomPaystackError(e);
        }
    };

    async addBank(request){
        debug("----paystack add bank------");
        try{
            const response = await this._axios.post(`/transferrecipient`, {
                type: BANKTYPE.NUBAN,
                name: request.bankName,
                description:"PMB Add Bank",
                currency: "NGN",
                bank_code:request.bankCode,
                account_number: request.accountNumber,
            });
            debug("paystack bank response-----",response.data);
            return response.data;
        }catch(e){
            debug("paystack add bank error---",e.message );
            throw new CustomPaystackError(e);
        }
        
    }

}

module.exports = (new PaystackService());