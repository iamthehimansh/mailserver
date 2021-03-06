require('dotenv').config()
const express = require("express");
var cors = require('cors')
const app = express();
const port = process.env.PORT||3000;
app.use(cors())
const nodemailer = require('nodemailer');
app.use(express.json());
let transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  auth: {
    user: process.env.mail,
    pass: process.env.pass
  }
});

app.post("/:email", (req, res) => {
  let message = {
    from: process.env.mail,
    to: req.params.email,
    subject: "Auto Message from server",
    text: "Your Responce\n"+Object.entries(req.body).map(([key,value])=>key+": "+value).join("\n")
  }
  
  console.log(message)
  transporter.sendMail(message,  (err, info)=> {
    if (err) {
      console.log(err)
      res.status(404).send("failed")
    } else {
      console.log(info);
      res.status(200).send("Sent")
    }
  });
});
app.get("/",(req,res)=>{
  if(!process.env.debug){
    return res.send("Only Post")
  }
  
  res.send(`Ruko sabar Karo<script>window.m= fetch("/iamthehimansh@gmail.com",{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:"himansh",sub:"op",xop:"op",ua:navigator.userAgent}) 
  }).then(()=>document.body.innerHTML="<h1>Hogaya</h1>")</script>`)})
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
