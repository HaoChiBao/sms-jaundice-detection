require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

console.log(accountSid, authToken)
// wasd
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Twilio',
        from: '+12184605569',
        to: '+16479375288'
    })
    .then(message => console.log(message.sid))