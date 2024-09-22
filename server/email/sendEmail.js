const nodemailer = require("nodemailer");


//Initialize smtp server
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});


const sendEmail = async (sendTo, subject, message) => {
    const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: sendTo,
        subject: subject,
        html: message
    })

    return info.messageId
}


module.exports = sendEmail;