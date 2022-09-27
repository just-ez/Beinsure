const axios = require('axios');
const BaseController = require('../utils/baseController')
const { AMOUNT, PAYSTACK_SECRET_KEY, PAYSTACK_BASE_URL, CONNECTION_TIMEOUT } = require('../core/config');

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
    };
}

const axiosInstance = axios.create({
    baseURL: PAYSTACK_BASE_URL,
    timeout: Number(CONNECTION_TIMEOUT),
    headers: getHeaders()
});

exports.createTransferRecipient = async (data) => {
    try {
        const response = await axiosInstance.post(`/transferrecipient`, data);
        const {recipient_code, details} = response.data.data;
        return {
            recipientCode: recipient_code,
            accountName: details.account_name,
            bankName: details.bank_name
        }
    } catch (e) {
        BaseController.error(res,{code: 400},e)
    }
}

exports.initializePayment = async (email) => {
    try {
        const response = await axiosInstance.post(`/initialize`, { email, amount: AMOUNT });
        console.log(response.data)
        return {reference: response.data.data.reference, confirmationUrl: response.data.data.authorization_url };
    } catch (e) {
        BaseController.error(res,{code: 400},e)
    }
}

exports.verifyPayment = async (reference) => {
    try {
        const response = await axiosInstance.get(`/verify/${reference}`);
        return { status: response.data.data.status, message: response.data.data.gateway_response, paymentDate: response.data.data.paidAt };
    } catch (e) {
        console.log(e.message);
    }
}