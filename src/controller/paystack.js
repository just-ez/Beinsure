const paystack = require("../integration/paystackClient");
const { success, error } = require("../utils/baseController");
const USermodel = require('../models/user')

module.exports.initializePayment = async (req, res) => {
  const email = req.body.email;
  const user = await USermodel.findOne({email: email})
  if (user) {
  const result = await paystack.initializePayment(email);
  const updateUser = await USermodel.updateOne(
    { email: email },
    { verifyPaymentRef: result.reference }
  );
  if (result) return success(res, result, 'payment successful',200);
 }
};


module.exports.verifyPayment = async (req,res) => {
    console.log(req.body.email);
    const user = await USermodel.findOne({email: req.body.email});
    
    if (user) {
        const result = await paystack.verifyPayment(user.verifyPaymentRef)
        console.log(result);
        if (result.status === "success") {
          const updatePaymentStatus = await USermodel.updateOne(
            { email: req.body.email },
            { isPaymentVerified: true }
          );
          return success(res, result, "payment succesfull", 200);
        } else {
          return error(
            res,
            400,
            "  payment decilned or transaction was not completed"
          );
        }
    }
}