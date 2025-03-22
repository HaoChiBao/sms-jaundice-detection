import fs from 'fs';

function imageToBase64(filePath) {
    try {
        const imageBuffer = fs.readFileSync(filePath);
        return imageBuffer.toString('base64');
    } catch (error) {
        console.error("Error reading the file:", error);
        return null;
    }
}

export default imageToBase64