const sendEmail = require("../email/sendEmail");
const storeCollection = require("../model/storeModel");
const userDetailsCollection = require("../model/userDetailsModel");
const verificationCodeCollection = require("../model/verificationCodeModel");
const verificationCodeTemplate = require("../templates/verificationCode");

const handleLogin = async (req, res) => {
    try {
        const { email, storeId } = req.body;
        const { verificationCode } = req.query;


        if (verificationCode) {
            //Check if the verification code is valid
            const code = await verificationCodeCollection.findOne({ email, code: verificationCode });

            if (code) {
                await verificationCodeCollection.deleteOne({ email, code: verificationCode });
                const userExistedAddress = await userDetailsCollection.findOne({ email, storeId });
                res.status(200).send({ message: "success", token: userExistedAddress?.addressToken });
            }

            else {
                res.status(403).json({ message: "Invalid or expired code. Please try again." });
            }
        }

        else {

            //Check if user data exists
            const user = await userDetailsCollection.findOne({ email, storeId });
            if (!user) {
                return res.status(403).json({ message: "User not found" });
            }

            //Delete existing verification code if any
            await verificationCodeCollection.deleteOne({ email });


            //Create and save new verification code
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

            //Saving code
            const newVerificationCode = verificationCodeCollection({
                email,
                code: verificationCode
            });

            const result = await newVerificationCode.save();

            //Send the code to the user through email
            if (result) {
                //Get the store name
                const requestedStore = await storeCollection.findOne({ storeId });
                const emailResult = await sendEmail(email, requestedStore?.storeName, `Your login code is ${verificationCode}`, verificationCodeTemplate(verificationCode, requestedStore?.storeName));

                if (emailResult?.messageId) {
                    res.status(200).send("success");
                }

                else {
                    res.status(500).send("Internal Server Error");
                }
            }

        }


    }

    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = handleLogin;