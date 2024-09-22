const handleCashOnDeliveryCheckout = require("../controllers/handleCashOnDeliveryCheckout");
const handleCheckoutSuccess = require("../controllers/handleCheckoutSuccess");
const handleGetOrders = require("../controllers/handleGetOrders");
const handleGetStoreId = require("../controllers/handleGetStoreId");
const handleGetUserOrder = require("../controllers/handleGetUserOrder");
const handleOrderUpdate = require("../controllers/handleOrderUpdate");
const handleStoreCreation = require("../controllers/handleStoreCreation");
const handleStoreUpdate = require("../controllers/handleStoreUpdate");
const handleStripeCheckout = require("../controllers/handleStripeCheckout");

const router = require("express").Router();


//Stripe checkout routes
router.post("/checkout", handleStripeCheckout);
router.get("/success", handleCheckoutSuccess);

//COD checkout routes
router.post("/checkout/cod", handleCashOnDeliveryCheckout);

//Order management routes
router.get("/orders", handleGetOrders);
router.put("/orders", handleOrderUpdate);

//Store creation routes
router.post("/store", handleStoreCreation);
router.get("/store", handleGetStoreId)
router.put("/store", handleStoreUpdate);

//User order getting routes
router.get("/userOrders", handleGetUserOrder);


module.exports = router;