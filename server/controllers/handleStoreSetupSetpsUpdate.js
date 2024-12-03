const storeCollection = require("../model/storeModel");

const handleStoreSetupStepsUpdate = async (req, res) => {
    try {
        const { storeId } = req.query;
        const step = req.body;
        await storeCollection.updateOne(
            { storeId: storeId },
            { $push: { setupSteps: step } }
        );

        res.send({ success: true });

    }
    catch (error) {
        res.status(error.status).send(error.message);
        console.log(error);
    }
}


module.exports = handleStoreSetupStepsUpdate;