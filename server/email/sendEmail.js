const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_API_KEY;



const sendEmail = async (receiver, storeName, subject, htmlContent) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sender = {
        email: process.env.EMAIL_SENDER,
        name: storeName || "eComer"
    }
    const receivers = [
        {
            email: receiver
        }
    ];

    const sendEmail = await apiInstance.sendTransacEmail({
        sender,
        to: receivers,
        subject,
        htmlContent
    });



    return sendEmail;
}


module.exports = sendEmail;