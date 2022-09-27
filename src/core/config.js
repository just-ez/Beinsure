require('dotenv').config()

module.exports = {
  mongodburi: process.env.mongodburi,
  port_number: 3000,
  jwt_Secret_key: process.env.jwt_Secret_key,
  jwt_duration: "7 days",
  PAYSTACK_BASE_URL: "",
  PAYSTACK_SECRET_KEY: "sk_test_9057fbab34ee105d87d0d8bd7d1ef2c3cb87b8d1",
  PAYSTACK_BASE_URL: "https://api.paystack.co/transaction",
  AMOUNT: 1000,
  CONNECTION_TIMEOUT: 1000,
};