import dotenv from 'dotenv';
dotenv.config();

async function predict(imageBlob) {
    // console.log(imageBlob)

    const response = await fetch(`${process.env.MODEL_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageBlob })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}


export default predict