
const storeCollection = require('../model/storeModel');
const { v4: uuidv4 } = require('uuid');

const handleStoreCreation = async (req, res) => {
    try {
        const storeData = req.body;

        //Check for duplication
        // const isStoreExist = await storeCollection.findOne({ admin: storeData?.admin });
        // if (isStoreExist) {
        //     return res.status(400).send({ message: "Store exists with same credentials!" });
        // }

        //Hashing stripe secret
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