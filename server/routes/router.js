const handleCheckoutSuccess = require("../controllers/handleCheckoutSuccess");
const handleGetOrders = require("../controllers/handleGetOrders");
const handleGetStoreId = require("../controllers/handleGetStoreId");
const handleStoreCreation = require("../controllers/handleStoreCreation");
const handleStripeCheckout = require("../controllers/handleStripeCheckout");

const router = require("express").Router();


//Checkout routes
router.post("/checkout", handleStripeCheckout);
router.get("/success", handleCheckoutSuccess);

//Order management routes
router.get("/orders", handleGetOrders);

//Store creation routes
router.post("/store", handleStoreCreation);
router.get("/store", handleGetStoreId)


module.exports = router;