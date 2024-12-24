const userDetailsCollection = require("../model/userDetailsModel");
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const cleanAddress = (address) => {
    return JSON.parse(JSON.stringify(address, (key, value) => {
        if (typeof value === "string") {
            return value.trim().toLowerCase();
        }
        return value;
    }));
};

const handleUserDetailsSaving = async (req, res) => {
    try {
        const { email, storeId, address } = req.body;


        const cleanedNewAddress = cleanAddress(address);

        const existingUsers = await userDetailsCollection.find({ email, storeId });

        if (existingUsers.length > 0) {

            const isDuplicate = existingUsers.some((user) => {
                const cleanedExistingAddress = cleanAddress(user.address);
                return _.isEqual(cleanedExistingAddress, cleanedNewAddress);
            });

            if (isDuplicate) {
                res.send({ message: "Address is the same, no new entry created." });
            } else {

                const newUserDetails = new userDetailsCollection({
                    email,
                    storeId,
                    address,
                    addressToken: uuidv4(),
                });
                const result = await newUserDetails.save();
                res.send({ token: result.addressToken });
            }
        } else {
            // Add new entry if no data exist
            const newUserDetails = new userDetailsCollection({
                email,
                storeId,
                address: address,
                addressToken: uuidv4(),
            });
            const result = await newUserDetails.save();
            res.send({ token: result.addressToken });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = handleUserDetailsSaving;
