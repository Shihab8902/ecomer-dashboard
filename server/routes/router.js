const handleCheckoutSuccess = require("../controllers/handleCheckoutSuccess");
const handleGetOrders = require("../controllers/handleGetOrders");
const handleStripeCheckout = require("../controllers/handleStripeCheckout");

const router = require("express").Router();


//Checkout routes
router.post("/checkout", handleStripeCheckout);
router.get("/success", handleCheckoutSuccess);

//Order management routes
router.get("/orders", handleGetOrders);


module.exports = router;