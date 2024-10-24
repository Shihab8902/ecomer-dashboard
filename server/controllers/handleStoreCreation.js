
const storeCollection = require('../model/storeModel');
const { v4: uuidv4 } = require('uuid');

const handleStoreCreation = async (req, res) => {
    try {
        const storeData = req.body;


        if (storeData) {
            const data = {
                ...storeData,
                storeId: `store_${uuidv4()}`
            }
            const newStoreData = storeCollection(data);
            const result = await newStoreData.save();
            res.send(result);
            return
        }

        res.status(400).send({ message: "Invalid store data!" });
    }
    catch (error) {
        throw new Error(error.message)
    }


}

module.exports = handleStoreCreation;