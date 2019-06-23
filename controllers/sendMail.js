var nodeMailer = require('nodemailer');

// set NODE_TLS_REJECT_UNAUTHORIZED=0




const send = async(req, res) => {

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'rawda95.r@gmail.com',
            pass: 'gooroozyahoo1212'
        }
    });
    console.log('in sendMail function');

    let mailOptions = {
        from: 'rawda95.r@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message, // plain text body
        // html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error");
            res.status(400).send({
                message: error
            });

        }
        console.log("Done")

        res.send({
            message: 'done'
        });
        // console.log('Message %s sent: %s', info.messageId, info.response);
        // res.render('index');
    });
}






module.exports = {
    send
}