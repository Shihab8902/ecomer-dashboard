const userDetailsCollection = require("../model/userDetailsModel");

const handleGetUserDetails = async (req, res) => {
    try {
        const { accessToken, loggedIn } = req.query;



        //Find corresponding user details based on access token
        const requestedUser = await userDetailsCollection.findOne({ addressToken: accessToken });


        //Send all data if user is logged in
        if (loggedIn === 'true') {
            const userDetails = await userDetailsCollection.find({ email: requestedUser?.email, storeId: requestedUser?.storeId });
            return res.status(200).send(userDetails);
        }
        //Send only recent data if user is not logged in
        else {
            const userDetails = await userDetailsCollection.findOne({ addressToken: accessToken });
            return res.status(200).send(userDetails);
        }


    }
    catch (err) {
        console.log(err)
    }
}


module.exports = handleGetUserDetails;