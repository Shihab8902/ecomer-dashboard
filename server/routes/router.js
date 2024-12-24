const handleCashOnDeliveryCheckout = require("../controllers/handleCashOnDeliveryCheckout");
const handleCheckoutSuccess = require("../controllers/handleCheckoutSuccess");
const handleFileUpload = require("../controllers/handleFileUpload");
const handleGetOrders = require("../controllers/handleGetOrders");
const handleGetSingleOrderData = require("../controllers/handleGetSingleOrderData");
const handleGetStoreId = require("../controllers/handleGetStoreId");
const handleGetUserOrder = require("../controllers/handleGetUserOrder");
const handleMigration = require("../controllers/handleMigration");
const handleOrderUpdate = require("../controllers/handleOrderUpdate");
const handlePaymentMethodActivation = require("../controllers/handlePaymentMethodActivation");
const handlePaymentMethodDeactivation = require("../controllers/handlePaymentMethodDeactivation");
const handlePaymentMethodRequest = require("../controllers/handlePaymentMethodRequest");
const handleStoreCreation = require("../controllers/handleStoreCreation");
const handleStoreDelete = require("../controllers/handleStoreDelete");
const handleStoreSetupStepsUpdate = require("../controllers/handleStoreSetupSetpsUpdate");
const handleStoreUpdate = require("../controllers/handleStoreUpdate");
const handleStripeCheckout = require("../controllers/handleStripeCheckout");
const handleTotalOrderCount = require("../controllers/handleTotalOrderCount");
const handleYocoCheckout = require("../controllers/handleYocoCheckout");
const handleYocoSuccess = require("../controllers/success/handleYocoSuccess");

const router = require("express").Router();
const multer = require("multer");
const customerEmailTemplate = require("../templates/customer");
const handleUserDetailsSaving = require("../controllers/handleUserDetailsSaving");
const handleGetUserDetails = require("../controllers/handleGetUserDetails");
const handleLogin = require("../controllers/handleLogin");
const upload = multer({ storage: multer.memoryStorage() });


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
router.get("/order", handleGetSingleOrderData);
router.get("/orders/total", handleTotalOrderCount);
router.put("/orders", handleOrderUpdate);

//Store creation routes
router.post("/store", handleStoreCreation);
router.get("/store", handleGetStoreId)
router.put("/store", handleStoreUpdate);
router.delete("/store", handleStoreDelete);
router.put("/store/setup", handleStoreSetupStepsUpdate);

//User order getting routes
router.get("/userOrders", handleGetUserOrder);

//Feature request routes
router.put("/payment/request", handlePaymentMethodRequest);

//File upload routes
router.post("/file/upload", upload.single("image"), handleFileUpload);

//User Details routes
router.get("/userDetails", handleGetUserDetails);
router.post("/userDetails", handleUserDetailsSaving);

//Login Routes
router.post("/login", handleLogin);

//Migration 
router.get("/admin/migrate", handleMigration);



module.exports = router;