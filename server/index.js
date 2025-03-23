import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { URL } from 'url';


import predict from './services/predict.js';
import imageToBase64 from './services/imageToBlob.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const MessagingResponse = twilio.twiml.MessagingResponse;
const __dirname = path.dirname(decodeURIComponent(new URL(import.meta.url).pathname)).replace(/^\/([A-Za-z]):\//, '$1:/');
const TMP_FOLDER = path.join(__dirname, 'tmp');
if (!fs.existsSync(TMP_FOLDER)) {
    fs.mkdirSync(TMP_FOLDER, { recursive: true });
}

const locations = [
    'Toronto, Ontario, Canada',
    'Vancouver, British Columbia, Canada',
    'Montreal, Quebec, Canada',
    'Calgary, Alberta, Canada',
    'Lagos, Nigeria'
]

app.post('/locations', async (req, res) => {
    res.send(locations);
})

app.post('/webhook', async (req, res) => {
    try {
        console.log(req.body)
        const city = req.body.FromCity || 'Unknown City';
        const state = req.body.FromState || 'Unknown State';
        const country = req.body.FromCountry || 'Unknown Country';

        console.log(city, state, country);
        
        
        const numMedia = parseInt(req.body.NumMedia, 10);
        const twiml = new MessagingResponse();
    
        if (numMedia > 0){
            twiml.message(`Image Received`);
        }
        else {
            twiml.message(`You said: "${req.body.Body}"`);
        }

        console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    
        if (numMedia > 0) {
            locations.push( `${city}, ${state}, ${country}`);
            let saveOperations = [];
            for (let i = 0; i < numMedia; i++) {
                const mediaUrl = req.body[`MediaUrl${i}`];
                const contentType = req.body[`MediaContentType${i}`];
                const mediaSid = path.basename(new URL(mediaUrl).pathname);
                const fileExtension = contentType.split('/')[1] || 'jpg';
                const filePath = path.join(TMP_FOLDER, `${mediaSid}.${fileExtension}`);
    
                if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
                    console.error('Twilio credentials missing in .env file');
                    continue;
                }
    
                saveOperations.push(
                    fetch(mediaUrl, {
                        headers: {
                            Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`
                        }
                    })
                    .then(async response => {
                        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
                        const fileStream = fs.createWriteStream(filePath);
                        response.body.pipe(fileStream);
                        await new Promise((resolve, reject) => {
                            fileStream.on('finish', () => {
                                console.log(`Image saved: ${filePath}`);
                                resolve();
                            });
                            fileStream.on('error', reject);
                        });
                        
                        const base64Image = await imageToBase64(filePath)
                        const prediction = await predict(base64Image);
                        // return jsonify({
                        //     'prediction_num': pred.item(),
                        //     'prediction_str': prediction_str
                        // })
                        console.log(prediction);
                        twiml.message(prediction.prediction_str);
                    })
                    .catch(error => console.error('Error downloading image:', error))
                );
            }
            await Promise.all(saveOperations);
        }
    
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());

    } catch (e) {
        console.log(e)
        res.status(500).send('An error occurred');
    }
});

app.get('/', (req, res) => {
    res.send('cool beans')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));