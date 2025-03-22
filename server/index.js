const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const { MessagingResponse } = twilio.twiml;

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(`Hello, ${req.body.From}. You said: "${req.body.Body}"`);
    
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

app.listen(3000, () => console.log('Webhook running on port 3000'));