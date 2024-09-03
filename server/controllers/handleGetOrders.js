const orderCollection = require("../model/orderModel");

const handleGetOrders = async (req, res) => {
    try {
        const user = req.query.user;


        //Check if the user is admin
        const allOrders = await orderCollection.find();
        const isAdmin = allOrders?.find(order => order.products?.find(product => product.admin === user)) ? true : false;

        //Send orders data for admin
        if (isAdmin) {
            const orders = allOrders.filter(order => order.products?.filter(product => product.admin === user))
            return res.send(orders);
        }

        //Send orders for customer
        const orders = allOrders.filter(order => order.shipping_details.email === user);
        res.send(orders);


    }
    catch (error) {
        console.log(error);
    }
}


module.exports = handleGetOrders;