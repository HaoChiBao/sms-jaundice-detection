require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNTSID
const authToken = process.env.TWILIO_AUTHTOKEN

console.log(accountSid, authToken)
// const accountSid = 'ACd9a2eb80667dae60865d078aedd9e815';
// const authToken = '14a36c5a9cb8312754509600648ad6cb';

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Twilio',
        from: '+12184605569',
        to: '+16479375288'
    })
    .then(message => console.log(message.sid))