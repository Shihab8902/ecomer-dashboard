const storeCollection = require("../model/storeModel");

const handleMigration = async (req, res) => {
    try {

        res.status(403).send({ message: "forbidden" });


    }
    catch (error) {
        console.log(error);
    }
}


module.exports = handleMigration;