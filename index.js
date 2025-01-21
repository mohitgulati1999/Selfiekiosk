const express = require("express")
const nodemailer = require("nodemailer")
var cors = require('cors')
const bodyParser = require("body-parser");



const app = express()
app.use(cors())

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("done")
})

app.post("/email",async(req,res)=>{
    try {
        // Parse the request body
        const { data, send_to } =await req.body;
        

        // Validate inputs
        if (!send_to || !data) {
            return res.send(
                { error: 'Email and data are required' },
            );
            res.status(400)
        }
        const attachments = [];
    if (data) {
      attachments.push({
        filename: "image.jpg", // Default to "image.jpg" if no filename is provided
        content: Buffer.from(data.split(",")[1], "base64"), // Convert base64 to buffer
        contentType: "image/jpeg", // Specify the content type (e.g., "image/png" for PNG files)
      });
    }

        // Create transporter
        const mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kunwarsingh040126@gmail.com',
                pass: 'xusu vird uwmk kzxm'
                        }
        });

        // Setup email options
        const mailOptions = {
            from: 'kunwarsingh040126@gmail.com',
            to: send_to,
            subject: 'Sending the image',
            text: "Your image -",
            attachments
        };

        // Send email
        const info = await mail.sendMail(mailOptions);

        // Return success response
        return res.send({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        return res.send(
            { 
                success: false,
            },

        );
        res.status(500)
    }
})


app.listen(3000)
