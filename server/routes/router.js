const handleCashOnDeliveryCheckout = require("../controllers/handleCashOnDeliveryCheckout");
const handleCheckoutSuccess = require("../controllers/handleCheckoutSuccess");
const handleGetOrders = require("../controllers/handleGetOrders");
const handleGetStoreId = require("../controllers/handleGetStoreId");
const handleGetUserOrder = require("../controllers/handleGetUserOrder");
const handleOrderUpdate = require("../controllers/handleOrderUpdate");
const handlePaymentMethodActivation = require("../controllers/handlePaymentMethodActivation");
const handlePaymentMethodDeactivation = require("../controllers/handlePaymentMethodDeactivation");
const handleStoreCreation = require("../controllers/handleStoreCreation");
const handleStoreUpdate = require("../controllers/handleStoreUpdate");
const handleStripeCheckout = require("../controllers/handleStripeCheckout");
const handleTotalOrderCount = require("../controllers/handleTotalOrderCount");
const handleYocoCheckout = require("../controllers/handleYocoCheckout");
const handleYocoSuccess = require("../controllers/success/handleYocoSuccess");

const router = require("express").Router();


//Stripe checkout routes
router.post("/checkout/stripe", handleStripeCheckout);
router.get("/success", handleCheckoutSuccess);

//Payment method management routes
router.put("/payment/deactivate", handlePaymentMethodDeactivation);
router.put("/payment/activate", handlePaymentMethodActivation);

//COD checkout routes
router.post("/checkout/cod", handleCashOnDeliveryCheckout);

//YOCO checkout routes
router.post("/checkout/yoco", handleYocoCheckout)
router.get("/success/yoco", handleYocoSuccess);

//Order management routes
router.get("/orders", handleGetOrders);
router.get("/orders/total", handleTotalOrderCount);
router.put("/orders", handleOrderUpdate);

//Store creation routes
router.post("/store", handleStoreCreation);
router.get("/store", handleGetStoreId)
router.put("/store", handleStoreUpdate);

//User order getting routes
router.get("/userOrders", handleGetUserOrder);


module.exports = router;